import { Dispatch, ReactElement, SetStateAction } from 'react';
import GenericModal from '../GenericModal';
import { IUserForm } from '../../utils';
import { AddOrEditUserForm } from '.';

const formId = 'user-form';

interface IUserHandlerPopup {
  mode: 'edit' | 'create' | undefined;
  formValues: IUserForm;
  handleSave: React.FormEventHandler<HTMLFormElement>;
  handleDelete: () => void;
  handleClose: () => void;
  title: string;
  setFormValues: Dispatch<SetStateAction<IUserForm>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function UserHandlerPopup(props: IUserHandlerPopup): ReactElement {
  return (
    <>
      <GenericModal
        title={props.title}
        show={props.mode === 'create' || props.mode === 'edit'}
        handleSave={() => {}}
        handleClose={props.handleClose}
        btnFormId={formId}
        btnType='submit'>
        <AddOrEditUserForm
          formValues={props.formValues}
          onSubmit={props.onSubmit}
          mode={props.mode}
          setFormValues={props.setFormValues}
          formId={formId}
        />
      </GenericModal>
    </>
  );
}
