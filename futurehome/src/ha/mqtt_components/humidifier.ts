/**
 * Represents a MQTT Humidifier component for Home Assistant MQTT Discovery.
 *
 * The `mqtt` humidifier platform lets you control your MQTT enabled humidifiers.
 *
 * For detailed documentation see:
 * https://www.home-assistant.io/integrations/humidifier.mqtt/
 */
export interface HumidifierComponent {
  /**
   * Must be `humidifier`.
   * Only allowed and required in [MQTT auto discovery device messages](https://www.home-assistant.io/integrations/mqtt/#device-discovery-payload).
   */
  platform: 'humidifier';

  /**
   * An ID that uniquely identifies this humidifier.
   * If two humidifiers have the same unique ID, Home Assistant will raise an exception.
   * Required when used with device-based discovery.
   */
  unique_id?: string;

  /**
   * The MQTT topic to publish commands to change the humidifier state.
   */
  command_topic: string;

  /**
   * The MQTT topic to publish commands to change the humidifier target humidity state based on a percentage.
   */
  target_humidity_command_topic: string;

  /**
   * The MQTT topic subscribed to receive state updates.
   * A `"None"` payload resets to an `unknown` state.
   * An empty payload is ignored.
   * Valid state payloads are `OFF` and `ON`.
   * Custom `OFF` and `ON` values can be set with the `payload_off` and `payload_on` config options.
   */
  state_topic?: string;

  /**
   * The MQTT topic on which to listen for the current humidity.
   * A `"None"` value received will reset the current humidity.
   * Empty values (`''`) will be ignored.
   */
  current_humidity_topic?: string;

  /**
   * The MQTT topic subscribed to receive humidifier target humidity.
   */
  target_humidity_state_topic?: string;

  /**
   * The MQTT topic subscribed to receive the humidifier `mode`.
   */
  mode_state_topic?: string;

  /**
   * The MQTT topic to publish commands to change the `mode` on the humidifier.
   * This attribute must be configured together with the `modes` attribute.
   */
  mode_command_topic?: string;

  /**
   * The MQTT topic to subscribe for changes of the current action.
   * Valid values: `off`, `humidifying`, `drying`, `idle`
   */
  action_topic?: string;

  /**
   * Flag that defines if humidifier works in optimistic mode.
   * Defaults to `true` if no state topic defined, else `false`.
   */
  optimistic?: boolean;

  /**
   * A list of available modes this humidifier is capable of running at.
   * Common examples include `normal`, `eco`, `away`, `boost`, `comfort`, `home`, `sleep`, `auto` and `baby`.
   * These examples offer built-in translations but other custom modes are allowed as well.
   * This attribute must be configured together with the `mode_command_topic` attribute.
   */
  modes?: string[];

  /**
   * The [device class](https://www.home-assistant.io/integrations/humidifier/#device-class) of the MQTT device.
   * Must be either `humidifier`, `dehumidifier` or `null`.
   * Default: `humidifier`
   */
  device_class?: 'humidifier' | 'dehumidifier' | null;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
   * that returns a string to be compared to the payload.
   * Used to extract a value for the humidifier `target_humidity` state.
   */
  target_humidity_state_template?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
   * that returns a string to be compared to the payload.
   * Used to extract a value for the humidifier `mode` state.
   */
  mode_state_template?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
   * with which the value received on `current_humidity_topic` will be rendered.
   */
  current_humidity_template?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-command-templates-with-mqtt)
   * to generate the payload to send to `command_topic`.
   */
  command_template?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-command-templates-with-mqtt)
   * to generate the payload to send to `target_humidity_command_topic`.
   */
  target_humidity_command_template?: string;

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-command-templates-with-mqtt)
   * to generate the payload to send to `mode_command_topic`.
   */
  mode_command_template?: string;

  /**
   * A special payload that resets the `target_humidity` state attribute to an `unknown` state
   * when received at the `target_humidity_state_topic`.
   * When received at `current_humidity_topic`, it will reset the current humidity state.
   * Default: `"None"`
   */
  payload_reset_humidity?: string;

  /**
   * A special payload that resets the `mode` state attribute to an `unknown` state
   * when received at the `mode_state_topic`.
   * Default: `"None"`
   */
  payload_reset_mode?: string;

  /**
   * The payload that represents the running state.
   * Default: `"ON"`
   */
  payload_on?: string;

  /**
   * The payload that represents the stop state.
   * Default: `"OFF"`
   */
  payload_off?: string;

  /**
   * The maximum target humidity percentage that can be set.
   * Default: 100
   */
  max_humidity?: number;

  /**
   * The minimum target humidity percentage that can be set.
   * Default: 0
   */
  min_humidity?: number;

  /**
   * The MQTT topic subscribed to receive availability (online/offline) updates.
   * Must not be used together with `availability`.
   */
  availability_topic?: string;

  /**
   * A list of MQTT topics subscribed to receive availability (online/offline) updates.
   * Must not be used together with `availability_topic`.
   */
  availability?: Array<{
    /**
     * An MQTT topic subscribed to receive availability (online/offline) updates.
     */
    topic: string;

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
     * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
     * to extract device's availability from the `topic`.
     * To determine the device's availability, result of this template will be compared to `payload_available` and `payload_not_available`.
     */
    value_template?: string;
  }>;

  /**
   * When `availability` is configured, this controls the conditions needed to set the entity to `available`.
   * Valid values: "all", "any", "latest"
   * Default: "latest"
   */
  availability_mode?: 'all' | 'any' | 'latest';

  /**
   * Defines a [template](https://www.home-assistant.io/docs/configuration/templating/#using-value-templates-with-mqtt)
   * to extract device's availability from the `availability_topic`.
   * To determine the device's availability, result of this template will be compared to `payload_available` and `payload_not_available`.
   */
  availability_template?: string;

  /**
   * The string that represents the `online` state.
   * Default: `"online"`
   */
  payload_available?: string;

  /**
   * The string that represents the `offline` state.
   * Default: `"offline"`
   */
  payload_not_available?: string;

  /**
   * The name of the humidifier.
   * Can be set to `null` if only the device name is relevant.
   * Default: `"MQTT humidifier"`
   */
  name?: string | null;

  /**
   * Used instead of `name` for automatic generation of `entity_id`.
   */
  object_id?: string;

  /**
   * Flag which defines if the entity should be enabled when first added.
   * Default: true
   */
  enabled_by_default?: boolean;

  /**
   * The encoding of the payloads received and published messages.
   * Set to `""` to disable decoding of incoming payload.
   * Default: `"utf-8"`
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
   * The maximum QoS level to be used when receiving and publishing messages.
   * Default: 0
   */
  qos?: number;

  /**
   * If the published message should have the retain flag on or not.
   * Default: true
   */
  retain?: boolean;

  /**
   * Information about the device this humidifier is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html).
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
}
