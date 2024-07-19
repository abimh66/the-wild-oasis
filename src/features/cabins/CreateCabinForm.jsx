import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import useCreateCabin from './useCreateCabin.js';
import useUpdateCabin from './useUpdateCabin.js';

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToUpdate = {} }) {
  const { id: updateId, ...updateValues } = cabinToUpdate;

  // 1. Check if it Update Current Cabin or Creating new one
  const isUpdateSession = Boolean(updateId);

  // 2. use react form hooks, use cabin data who provide by props as form default values if it is Update session
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isUpdateSession ? updateValues : {} });

  // 3. React query section -> handle remote state/connect to supabase API
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  function onSubmitForm(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    isUpdateSession
      ? updateCabin(
          { newCabinData: { ...data, image }, id: updateId },
          { onSuccess: () => reset() }
        )
      : createCabin({ ...data, image }, { onSuccess: () => reset() });
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register('name', {
            required: 'This field is required.',
          })}
        />
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required.',
            min: {
              value: 1,
              message: 'Capacity should be at least 1.',
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors?.maxCapacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required.',
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required.',
            min: { value: 0, message: 'Minimum discount is 0' },
            validate: (value) =>
              value <= getValues('regularPrice') ||
              'Discount should be less than regular price.',
          })}
        />
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required.',
          })}
        />
        {errors?.description?.message && (
          <Error>{errors?.description?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? 'Update' : 'Create new'} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
