
const JobDescriptionForm = ({ jobDesc, setJobDesc, handleSubmit }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-700">Enter Job Description</h2>
      <textarea
        className="w-full h-40 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="e.g. Looking for a React developer with experience in Redux and REST APIs..."
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Submit & Start Interview
      </button>
    </>
  );
};

export default JobDescriptionForm;
