/**
 * Represents an MQTT HVAC (Climate) component for Home Assistant MQTT Discovery.
 *
 * The `mqtt` climate platform lets you control your MQTT enabled HVAC devices.
 *
 * For detailed documentation see:
 * https://www.home-assistant.io/integrations/climate.mqtt/
 */
export interface ClimateComponent {
  /**
   * Must be `climate`.
   * Only allowed and required in [MQTT auto discovery device messages](https://www.home-assistant.io/integrations/mqtt/#device-discovery-payload).
   */
  platform: 'climate';

  /**
   * An ID that uniquely identifies this HVAC.
   * If two HVACs have the same unique ID, Home Assistant will raise an exception.
   * Required when used with device-based discovery.
   */
  unique_id: string;

  /**
   * A template to render the value received on the `action_topic` with.
   */
  action_template?: string;

  /**
   * The MQTT topic to subscribe for changes of the current action.
   * If this is set, the climate graph uses the value received as data source.
   * A "None" payload resets the current action state. An empty payload is ignored.
   * Valid action values: `off`, `heating`, `cooling`, `drying`, `idle`, `fan`.
   */
  action_topic?: string;

  /**
   * A template with which the value received on `current_humidity_topic` will be rendered.
   */
  current_humidity_template?: string;

  /**
   * The MQTT topic on which to listen for the current humidity.
   * A `"None"` value received will reset the current humidity.
   * Empty values (`''`) will be ignored.
   */
  current_humidity_topic?: string;

  /**
   * A template with which the value received on `current_temperature_topic` will be rendered.
   */
  current_temperature_template?: string;

  /**
   * The MQTT topic on which to listen for the current temperature.
   * A `"None"` value received will reset the current temperature.
   * Empty values (`''`) will be ignored.
   */
  current_temperature_topic?: string;

  /**
   * Information about the device this HVAC device is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html).
   * Only works when [`unique_id`](#unique_id) is set.
   * At least one of identifiers or connections must be present to identify the device.
   */
  device?: {
    /**
     * A link to the webpage that can manage the configuration of this device.
     * Can be either an `http://`, `https://` or an internal `homeassistant://` URL.
     */
    configuration_url?: string;

    /**
     * A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`.
     * For example the MAC address of a network interface:
     * `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.
     */
    connections?: Array<[string, string]>;

    /**
     * The hardware version of the device.
     */
    hw_version?: string;

    /**
     * A list of IDs that uniquely identify the device.
     * For example a serial number.
     */
    identifiers?: string[];

    /**
     * The manufacturer of the device.
     */
    manufacturer?: string;

    /**
     * The model of the device.
     */
    model?: string;

    /**
     * The model identifier of the device.
     */
    model_id?: string;

    /**
     * The name of the device.
     */
    name?: string;

    /**
     * The serial number of the device.
     */
    serial_number?: string;

    /**
     * Suggest an area if the device isn’t in one yet.
     */
    suggested_area?: string;

    /**
     * The firmware version of the device.
     */
    sw_version?: string;

    /**
     * Identifier of a device that routes messages between this device and Home Assistant.
     * Examples of such devices are hubs, or parent devices of a sub-device.
     * This is used to show device topology in Home Assistant.
     */
    via_device?: string;
  };

  /**
   * Flag which defines if the entity should be enabled when first added.
   * Default: true.
   */
  enabled_by_default?: boolean;

  /**
   * The encoding of the payloads received and published messages.
   * Set to `""` to disable decoding of incoming payload.
   * Default: "utf-8"
   */
  encoding?: string;

  /**
   * The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
   */
  entity_category?: string;

  /**
   * Picture URL for the entity.
   */
  entity_picture?: string;

  /**
   * A template to render the value sent to the `fan_mode_command_topic` with.
   */
  fan_mode_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the fan mode.
   */
  fan_mode_command_topic?: string;

  /**
   * A template to render the value received on the `fan_mode_state_topic` with.
   */
  fan_mode_state_template?: string;

  /**
   * The MQTT topic to subscribe for changes of the HVAC fan mode.
   * If this is not set, the fan mode works in optimistic mode (see below).
   * A "None" payload resets the fan mode state. An empty payload is ignored.
   */
  fan_mode_state_topic?: string;

  /**
   * A list of supported fan modes.
   * Default: ['auto', 'low', 'medium', 'high']
   */
  fan_modes?: string[];

  /**
   * Set the initial target temperature.
   * The default value depends on the temperature unit and will be 21° or 69.8°F.
   */
  initial?: number;

  /**
   * [Icon](https://www.home-assistant.io/docs/configuration/customizing-devices/#icon) for the entity.
   */
  icon?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
   * to extract the JSON dictionary from messages received on the `json_attributes_topic`.
   * Usage example can be found in [MQTT sensor](https://www.home-assistant.io/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation.
   */
  json_attributes_template?: string;

  /**
   * The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes.
   * Usage example can be found in [MQTT sensor](https://www.home-assistant.io/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
   */
  json_attributes_topic?: string;

  /**
   * The minimum target humidity percentage that can be set.
   * Default: 30.
   */
  min_humidity?: number;

  /**
   * Minimum set point available. The default value depends on the temperature unit,
   * and will be 7°C or 44.6°F.
   */
  min_temp?: number;

  /**
   * The maximum target humidity percentage that can be set.
   * Default: 99.
   */
  max_humidity?: number;

  /**
   * Maximum set point available. The default value depends on the temperature unit,
   * and will be 35°C or 95°F.
   */
  max_temp?: number;

  /**
   * A template to render the value sent to the `mode_command_topic` with.
   */
  mode_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the HVAC operation mode.
   */
  mode_command_topic?: string;

  /**
   * A template to render the value received on the `mode_state_topic` with.
   */
  mode_state_template?: string;

  /**
   * The MQTT topic to subscribe for changes of the HVAC operation mode.
   * If this is not set, the operation mode works in optimistic mode (see below).
   * A "None" payload resets to an `unknown` state. An empty payload is ignored.
   */
  mode_state_topic?: string;

  /**
   * A list of supported modes. Needs to be a subset of the default values.
   * Default: ['auto', 'off', 'cool', 'heat', 'dry', 'fan_only']
   */
  modes?: string[];

  /**
   * The name of the HVAC.
   * Can be set to `null` if only the device name is relevant.
   * Default: "MQTT HVAC"
   */
  name?: string | null;

  /**
   * Used instead of `name` for automatic generation of `entity_id`.
   */
  object_id?: string;

  /**
   * Flag that defines if the climate works in optimistic mode.
   * Default: `true` if no state topic defined, else `false`.
   */
  optimistic?: boolean;

  /**
   * The payload that represents the available state.
   * Default: "online"
   */
  payload_available?: string;

  /**
   * The payload that represents the unavailable state.
   * Default: "offline"
   */
  payload_not_available?: string;

  /**
   * The payload sent to turn off the device.
   * Default: "OFF"
   */
  payload_off?: string;

  /**
   * The payload sent to turn the device on.
   * Default: "ON"
   */
  payload_on?: string;

  /**
   * A template to render the value sent to the `power_command_topic` with.
   * The `value` parameter is the payload set for `payload_on` or `payload_off`.
   */
  power_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the HVAC power state.
   * Sends the payload configured with `payload_on` if the climate is turned on via the `climate.turn_on`,
   * or the payload configured with `payload_off` if the climate is turned off via the `climate.turn_off` action.
   * Note that `optimistic` mode is not supported through `climate.turn_on` and `climate.turn_off` actions.
   * When called, these actions will send a power command to the device but will not optimistically update the state
   * of the climate entity. The climate device should report its state back via `mode_state_topic`.
   */
  power_command_topic?: string;

  /**
   * The desired precision for this device.
   * Can be used to match your actual thermostat's precision.
   * Supported values are `0.1`, `0.5` and `1.0`.
   * Default: 0.1 for Celsius and 1.0 for Fahrenheit.
   */
  precision?: number;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-command-templates-with-mqtt)
   * to generate the payload to send to `preset_mode_command_topic`.
   */
  preset_mode_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the preset mode.
   */
  preset_mode_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive climate speed based on presets.
   * When preset 'none' is received or `None` the `preset_mode` will be reset.
   */
  preset_mode_state_topic?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
   * to extract the `preset_mode` value from the payload received on `preset_mode_state_topic`.
   */
  preset_mode_value_template?: string;

  /**
   * List of preset modes this climate is supporting.
   * Common examples include `eco`, `away`, `boost`, `comfort`, `home`, `sleep` and `activity`.
   * Default: []
   */
  preset_modes?: string[];

  /**
   * The maximum QoS level to be used when receiving and publishing messages.
   * Default: 0
   */
  qos?: number;

  /**
   * Defines if published messages should have the retain flag set.
   * Default: false
   */
  retain?: boolean;

  /**
   * A template to render the value sent to the `swing_horizontal_mode_command_topic` with.
   */
  swing_horizontal_mode_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the swing horizontal mode.
   */
  swing_horizontal_mode_command_topic?: string;

  /**
   * A template to render the value received on the `swing_horizontal_mode_state_topic` with.
   */
  swing_horizontal_mode_state_template?: string;

  /**
   * The MQTT topic to subscribe for changes of the HVAC swing horizontal mode.
   * If this is not set, the swing horizontal mode works in optimistic mode (see below).
   */
  swing_horizontal_mode_state_topic?: string;

  /**
   * A list of supported swing horizontal modes.
   * Default: ['on', 'off']
   */
  swing_horizontal_modes?: string[];

  /**
   * A template to render the value sent to the `swing_mode_command_topic` with.
   */
  swing_mode_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the swing mode.
   */
  swing_mode_command_topic?: string;

  /**
   * A template to render the value received on the `swing_mode_state_topic` with.
   */
  swing_mode_state_template?: string;

  /**
   * The MQTT topic to subscribe for changes of the HVAC swing mode.
   * If this is not set, the swing mode works in optimistic mode (see below).
   */
  swing_mode_state_topic?: string;

  /**
   * A list of supported swing modes.
   * Default: ['on', 'off']
   */
  swing_modes?: string[];

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-command-templates-with-mqtt)
   * to generate the payload to send to `target_humidity_command_topic`.
   */
  target_humidity_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the target humidity.
   */
  target_humidity_command_topic?: string;

  /**
   * The MQTT topic subscribed to receive the target humidity.
   * If this is not set, the target humidity works in optimistic mode (see below).
   * A `"None"` value received will reset the target humidity. Empty values (`''`) will be ignored.
   */
  target_humidity_state_topic?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
   * to extract a value for the climate `target_humidity` state.
   */
  target_humidity_state_template?: string;

  /**
   * A template to render the value sent to the `temperature_command_topic` with.
   */
  temperature_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the target temperature.
   */
  temperature_command_topic?: string;

  /**
   * A template to render the value sent to the `temperature_high_command_topic` with.
   */
  temperature_high_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the high target temperature.
   */
  temperature_high_command_topic?: string;

  /**
   * A template to render the value received on the `temperature_high_state_topic` with.
   * A `"None"` value received will reset the temperature high set point. Empty values (`''`) will be ignored.
   */
  temperature_high_state_template?: string;

  /**
   * The MQTT topic to subscribe for changes in the target high temperature.
   * If this is not set, the target high temperature works in optimistic mode (see below).
   */
  temperature_high_state_topic?: string;

  /**
   * A template to render the value sent to the `temperature_low_command_topic` with.
   */
  temperature_low_command_template?: string;

  /**
   * The MQTT topic to publish commands to change the target low temperature.
   */
  temperature_low_command_topic?: string;

  /**
   * A template to render the value received on the `temperature_low_state_topic` with.
   * A `"None"` value received will reset the temperature low set point. Empty values (`''`) will be ignored.
   */
  temperature_low_state_template?: string;

  /**
   * The MQTT topic to subscribe for changes in the target low temperature.
   * If this is not set, the target low temperature works in optimistic mode (see below).
   */
  temperature_low_state_topic?: string;

  /**
   * A template to render the value received on the `temperature_state_topic` with.
   */
  temperature_state_template?: string;

  /**
   * The MQTT topic to subscribe for changes in the target temperature.
   * If this is not set, the target temperature works in optimistic mode (see below).
   * A `"None"` value received will reset the temperature set point. Empty values (`''`) will be ignored.
   */
  temperature_state_topic?: string;

  /**
   * Defines the temperature unit of the device, `C` or `F`.
   * If this is not set, the temperature unit is set to the system temperature unit.
   */
  temperature_unit?: string;

  /**
   * Step size for temperature set point.
   * Default: 1
   */
  temp_step?: number;

  /**
   * Default template to render the payloads on *all* `*_state_topic`s with.
   */
  value_template?: string;
}
