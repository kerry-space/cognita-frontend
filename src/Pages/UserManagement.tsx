import './UserManagement.css';
import { UserManagementUI, Spinner, UserHandlerPopup } from '../Components';
import { useFetchWithToken } from '../Hooks';
import { IUser, BASE_URL, IUserForm } from '../utils';
import { useEffect, useState } from 'react';

const getTitle = (arg: 'edit' | 'create' | undefined): string => {
  switch (arg) {
    case 'edit':
      return 'Edit user';
    case 'create':
      return 'Create user';
    default:
      return '';
  }
};

export function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [formValues, setFormValues] = useState<IUserForm>({});
  const [fetchDummy, setFetchDummy] = useState(false);
  const [popup, setPopup] = useState<'edit' | 'create'>();

  const { requestFunc: createUserAsync } = useFetchWithToken(
    `${BASE_URL}/authentication`,
    {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const { requestFunc: updateUserAsync } = useFetchWithToken(
    `${BASE_URL}/users/${formValues.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const { requestFunc: fetchUsers, isLoading } = useFetchWithToken<IUser[]>(
    `${BASE_URL}/users`
  );

  useEffect(() => {
    fetchUsers().then(data => {
      if (data) {
        setUsers(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDummy]);

  const editClick = (user: IUser) => {
    setPopup('edit');
    setFormValues({ name: user.name, email: user.email, id: user.id });
  };

  const addClick = () => {
    setFormValues({});
    setPopup('create');
  };

  const closePopup = () => setPopup(undefined);

  const handlePopupSaveClick: React.FormEventHandler<
    HTMLFormElement
  > = async e => {
    e.preventDefault();
    if (popup === 'edit') {
      await updateUserAsync();
    }

    if (popup === 'create') {
      await createUserAsync();
    }
    setFetchDummy(prev => !prev);
    closePopup();
  };

  const handleDelete = () => {};

  return (
    <section
      className={
        'd-flex justify-content-center align-items-center user-mgmt-page'
      }>
      {isLoading ? (
        <Spinner />
      ) : (
        <UserManagementUI
          data={users}
          header='User management'
          editClick={editClick}
          addClick={addClick}
        />
      )}
      <UserHandlerPopup
        onSubmit={handlePopupSaveClick}
        setFormValues={setFormValues}
        handleDelete={handleDelete}
        handleSave={handlePopupSaveClick}
        handleClose={closePopup}
        title={getTitle(popup)}
        mode={popup}
        formValues={formValues}
      />
    </section>
  );
}
