import TaskForm from '../components/TaskForm';

const AddDevice = () => {
  return (
    <div className="container mx-auto p-6">
      <TaskForm
        devices={[]}
        setDevices={function () {}}
        editingDevice={null}
        setEditingDevice={function () {}}
      />
    </div>
  );
};

export default AddDevice;