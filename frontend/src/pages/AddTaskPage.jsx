import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';

const initialState = {
  title: '',
  description: '',
  status: 'Pending'
};

function AddTaskPage() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = 'Title is required.';
    }

    if (form.description.trim().length < 20) {
      nextErrors.description = 'Description must be at least 20 characters.';
    }

    if (!['Pending', 'In Progress'].includes(form.status)) {
      nextErrors.status = 'Choose a valid status.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    if (!validate()) {
      return;
    }

    setSaving(true);

    try {
      await createTask(form);
      navigate('/dashboard');
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Unable to create task.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-panel">
        <div className="page-header mb-4">
          <p className="eyebrow">Create Task</p>
          <h1>Add a new task</h1>
        </div>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            />
            {errors.title ? <div className="invalid-feedback d-block">{errors.title}</div> : null}
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              rows="5"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            />
            {errors.description ? <div className="invalid-feedback d-block">{errors.description}</div> : null}
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Status</label>
            <select
              className={`form-select ${errors.status ? 'is-invalid' : ''}`}
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
            {errors.status ? <div className="invalid-feedback d-block">{errors.status}</div> : null}
          </div>
          {submitError ? <div className="col-12"><div className="alert alert-danger">{submitError}</div></div> : null}
          <div className="col-12 d-flex gap-2 justify-content-end">
            <button type="button" className="btn btn-outline-light" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-info fw-semibold" disabled={saving}>
              {saving ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddTaskPage;
