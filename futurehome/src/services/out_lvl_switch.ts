import { sendFimpMsg } from '../fimp/fimp';
import {
  VinculumPd7Device,
  VinculumPd7Service,
} from '../fimp/vinculum_pd7_device';
import { ServiceComponentsCreationResult } from '../ha/publish_device';

export function out_lvl_switch__components(
  topicPrefix: string,
  device: VinculumPd7Device,
  svc: VinculumPd7Service,
  _svcName: string,
): ServiceComponentsCreationResult | undefined {
  const commandTopic = `${topicPrefix}${svc.addr}/command`;
  const stateTopic = `${topicPrefix}${svc.addr}/state`;

  const minLvl = svc.props?.min_lvl ?? 0;
  const maxLvl = svc.props?.max_lvl ?? 100;

  // ✅ Safe light detection
  const isLightDevice =
    device.type?.type === 'light' ||
    (device.type?.supported?.light?.length ?? 0) > 0;

  if (isLightDevice) {
    // Use light component for light devices
    return {
      components: {
        [`${svc.addr}_light`]: {
          unique_id: `${svc.addr}_light`,
          platform: 'light',
          name: 'Light',
          brightness: true,
          brightness_scale: maxLvl,
          command_topic: commandTopic,
          optimistic: false,
          state_topic: stateTopic,
          state_value_template: `{% if value_json.lvl > 0 %}ON{% else %}OFF{% endif %}`,
          brightness_state_topic: stateTopic,
          brightness_value_template: `{{ value_json.lvl }}`,
        },

        // Remove the no longer needed `number` entity
        [svc.addr]: {
          unique_id: svc.addr,
        } as any,
      },

      commandHandlers: {
        [commandTopic]: async (payload: string) => {
          let state: 'ON' | 'OFF' | undefined;
          let brightness: number | undefined;

          try {
            const obj = JSON.parse(payload);
            state = obj.state;
            brightness = obj.brightness;
          } catch {
            // Not JSON, fallback to simple payload
            if (payload === 'ON' || payload === 'OFF') state = payload as 'ON' | 'OFF';
            else brightness = parseInt(payload, 10);
          }

          let lvl = brightness ?? (state === 'ON' ? maxLvl : minLvl);
          lvl = Math.max(minLvl, Math.min(maxLvl, lvl));

          await sendFimpMsg({
            address: svc.addr!,
            service: 'out_lvl_switch',
            cmd: 'cmd.lvl.set',
            val: lvl,
            val_t: 'int',
          });
        },
      },
    };
  } else {
    // Use number component for non-light devices
    return {
      components: {
        [svc.addr]: {
          unique_id: svc.addr,
          platform: 'number',
          name: 'Level Switch',
          min: minLvl,
          max: maxLvl,
          step: 1,
          command_topic: commandTopic,
          optimistic: false,
          value_template: `{{ value_json.lvl }}`,
        },
      },

      commandHandlers: {
        [commandTopic]: async (payload: string) => {
          const lvl = parseInt(payload, 10);
          if (!Number.isNaN(lvl)) {
            await sendFimpMsg({
              address: svc.addr!,
              service: 'out_lvl_switch',
              cmd: 'cmd.lvl.set',
              val: lvl,
              val_t: 'int',
            });
          }
        },
      },
    };
  }
}
