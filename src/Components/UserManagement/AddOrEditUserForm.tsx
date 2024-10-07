import { Form } from 'react-bootstrap';
import { BASE_URL, IUserForm } from '../../utils';
import { useFetchWithToken } from '../../Hooks';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICourse } from '../../Data/Interface';
import { Spinner } from '../Loaders';

interface IAddOrEditFormProps {
  formId?: string;
  mode: 'edit' | 'create' | undefined;
  setFormValues: Dispatch<SetStateAction<IUserForm>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  formValues: IUserForm;
}

export function AddOrEditUserForm({
  formId,
  mode,
  setFormValues,
  onSubmit,
  formValues,
}: IAddOrEditFormProps) {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { requestFunc: fetchCourses, isLoading } = useFetchWithToken<ICourse[]>(
    `${BASE_URL}/courses`
  );

  useEffect(() => {
    if (mode === 'create') {
      fetchCourses().then(data => {
        if (data) {
          setCourses(data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={onSubmit} id={formId}>
      {mode === 'create' && (
        <Form.Select
          onChange={e =>
            setFormValues(prev => ({ ...prev, role: parseInt(e.target.value) }))
          }
          value={formValues.role}
          required
          name='role'
          className='mb-3'>
          <option value=''>Select a role</option>
          <option value={0}>Teacher</option>
          <option value={1}>Student</option>
        </Form.Select>
      )}
      <Form.Group className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={e =>
            setFormValues(prev => ({ ...prev, name: e.target.value }))
          }
          value={formValues.name}
          required
          type='text'
          name='name'
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={e =>
            setFormValues(prev => ({ ...prev, email: e.target.value }))
          }
          required
          value={formValues.email}
          type='email'
          name='email'
        />
      </Form.Group>
      {mode === 'create' && (
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={e =>
              setFormValues(prev => ({
                ...prev,
                password: e.target.value,
              }))
            }
            value={formValues.password}
            required
            minLength={3}
            type='password'
            name='password'
          />
        </Form.Group>
      )}
      {mode === 'create' && (
        <Form.Select
          onChange={e =>
            setFormValues(prev => ({
              ...prev,
              courseId: e.target.value,
            }))
          }
          name='courseId'
          value={formValues.courseId}
          required
          className='mb-3'>
          <option value=''>Select a course</option>
          {courses.map(c => (
            <option key={c.courseId} value={c.courseId}>
              {c.courseName}
            </option>
          ))}
          <option value={1}>Test Course</option>
        </Form.Select>
      )}
    </Form>
  );
}
