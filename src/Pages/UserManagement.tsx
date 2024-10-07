import './UserManagement.css';
import { UserManagementUI, Spinner, UserHandlerPopup } from '../Components';
import { useFetchWithToken } from '../Hooks';
import { IUser, BASE_URL, IUserForm } from '../utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICourseWithModule } from '../Data/Interface';

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
  const [headerText, setHeaderText] = useState<string>("User management - All courses");
  const { courseId } = useParams<{ courseId: string }>();

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

  // Adapted for loading users in a specific course.
  let requestUrl: string = `${BASE_URL}/users`
  let location = window.location.pathname;
  if (location !== '/user-management') {
    requestUrl = `${BASE_URL}/courses/${courseId}/users`;
  }

  const { requestFunc: fetchUsers, isLoading } = useFetchWithToken<IUser[]>(
    requestUrl
  );

  const { requestFunc: fetchCourse } = useFetchWithToken<ICourseWithModule>(
    `${BASE_URL}/courses/${courseId}`
  );

  useEffect(() => {
    fetchUsers().then(data => {
      if (data) {
        data.sort((u1, u2) => (u1.name.toLowerCase().split(' ')[0] > u2.name.toLowerCase().split(' ')[0] &&
          u1.role >= u2.role) ? 1 : -1);
        setUsers(data);
      }
    });
    setHeaderText("User management - All courses");
    if (courseId !== undefined){
      fetchCourse().then(data => {
        if (data) {
          setHeaderText("User management - " + data.courseName);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDummy, courseId]);

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
          header={headerText}
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
