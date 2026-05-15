import AddProduct from "./AddProduct";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center text-blue-950 mb-6">
        Admin Panel
      </h1>

      <AddProduct />
    </div>
  );
};

export default Admin;