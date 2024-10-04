import './spinner.css';

export function Spinner() {
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border bg-spinner' role='status'></div>
    </div>
  );
}
