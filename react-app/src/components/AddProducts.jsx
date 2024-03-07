import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
function AddProducts() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [pname, setpname] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [price, setprice] = useState("");
  const [pimage, setpimage] = useState("");
  const [pimage2, setpimage2] = useState("");
  const [category, setcategory] = useState("");
  const handleApi =()=>{
    const formData = new FormData();
    formData.append('pname',pname);
    formData.append('pdesc',pdesc);
    formData.append('price',price);
    formData.append('category',category);
    formData.append('pimage',pimage);
    formData.append('pimage2',pimage2);
    formData.append('userId',localStorage.getItem('userId'));
    const url = "http://localhost:4000/add-product";
    axios.post(url, formData)
    .then((res) => {
      console.log(res.data);
      alert("saved successfully");
      navigate('/');
        })
    .catch((err) => {
      console.error(err); 
    });
  };
  return (
    <div>
      <Header />
      <div className="p-3">
      <h2>Add the products here : </h2>
        <label>Product name</label>
        <input className="form-control" type="text" value={pname} onChange={(e)=>{setpname(e.target.value)}} />
        <label>Product Description</label>
        <input className="form-control" type="text" value={pdesc} onChange={(e)=>{setpdesc(e.target.value)}} />
        <label>Product Price</label>
        <input className="form-control" type="text" value={price} onChange={(e)=>{setprice(e.target.value)}} />
        <label>product Category :</label>
        <select className="form-control" value={category} onChange={(e) => setcategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Bikes">Bikes</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Cloth">Cloth</option>
          {
            categories && categories.length > 0 && 
            categories.map((item , index)=>{
              return (
                  <option key={'option' + index}>{item}</option>
                   
              )
            })
          }
        </select>
        <label>Product first Image</label>
        <input className="form-control" type="file"  onChange={(e)=>{setpimage(e.target.files[0])}} />
        <label>Product second Image</label>
        <input className="form-control" type="file"  onChange={(e)=>{setpimage2(e.target.files[0])}} />
        <button onClick={handleApi} className="btn btn-primary mt-3">SUBMIT</button>
      </div>
    </div>
  );
}

export default AddProducts;
