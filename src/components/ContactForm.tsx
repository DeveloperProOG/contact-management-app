import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { addContact, editContact, Contact } from '../redux/contactsSlice';

interface ContactFormProps {
  selectedContact?: Contact | null;
  clearSelectedContact: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ selectedContact, clearSelectedContact }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      status: 'inactive' as 'active' | 'inactive',
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedContact) {
      reset({
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        status: selectedContact.status,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        status: 'inactive',
      });
    }
  }, [selectedContact, reset]);

  const onSubmit = (data: { firstName: string; lastName: string; status: 'active' | 'inactive' }) => {
    if (selectedContact) {
      dispatch(editContact({ id: selectedContact.id, ...data }));
      clearSelectedContact();
    } else {
      dispatch(addContact({ id: new Date().toISOString(), ...data }));
    }
    reset();
    clearSelectedContact();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <div className="flex items-center">
            <label className="mr-2">
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <input
                    type="radio"
                    value="active"
                    checked={field.value === 'active'}
                    onChange={() => field.onChange('active')}
                    className="mr-1"
                  />
                )}
              />
              Active
            </label>
            <label>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <input
                    type="radio"
                    value="inactive"
                    checked={field.value === 'inactive'}
                    onChange={() => field.onChange('inactive')}
                    className="mr-1"
                  />
                )}
              />
              Inactive
            </label>
          </div>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {selectedContact ? 'Save Edited Contact' : 'Save Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
