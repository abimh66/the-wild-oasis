import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner.jsx';
import useSettings from './useSettings.js';
import useUpdateSetting from './useUpdateSetting.js';

function UpdateSettingsForm() {
  const { isLoading, error, settings = {} } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;
  const { updateSettings, isUpdating } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSettings({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
