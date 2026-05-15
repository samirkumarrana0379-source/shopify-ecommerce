import axios from "axios";
import { useState ,useEffect} from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
 
    try {
      await axios.post("http://localhost:5000/products/add", product);
      alert("Product added successfully");

      setProduct({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Product not added");
    }
  };
  const fetchProducts = async ()=>{
    try{
        const {data} = await axios.get("http://localhost:5000/products");
        setProducts(data);
    }catch (err){
        console.log(err);

    }
  };

  useEffect(()=>{
    fetchProducts();

  },[])
  const handleDelete = async(id)=>{
    try{
       await axios.delete(`http://localhost:5000/products/${id}`);

    setProducts(products.filter((prod) => prod._id !== id));

    alert("Product deleted"); 
    }catch(err){
        console.log(err);
    }
  }

  return (
  <>
    <form
      onSubmit={handleAddProduct}
      className="max-w-[500px] mx-auto bg-white p-5 rounded-2xl shadow-lg flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold text-blue-950 text-center">
        Add Product
      </h1>

      <input name="title" value={product.title} onChange={handleChange} placeholder="Product Title" className="border p-3 rounded-xl" />

      <input name="price" value={product.price} onChange={handleChange} placeholder="Price" className="border p-3 rounded-xl" />

      <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" className="border p-3 rounded-xl" />

      <input name="category" value={product.category} onChange={handleChange} placeholder="Category" className="border p-3 rounded-xl" />

      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="border p-3 rounded-xl" />

      <button className="bg-blue-950 text-white py-3 rounded-xl">
        Add Product
      </button>
    </form>
  <div className="max-w-[900px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
      {products.map((prod) => (
        <div
          key={prod._id}
          className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-3"
        >
          <img src={prod.image} alt={prod.title} className="h-40 object-contain" />

          <h2 className="font-bold text-lg">{prod.title}</h2>
          <p className="text-blue-950 font-semibold">${prod.price}</p>

          <button
            onClick={() => handleDelete(prod._id)}
            className="bg-red-500 text-white py-2 rounded-xl"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </>

    

    
  );
};

export default AddProduct;