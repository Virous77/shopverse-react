import React, { useState } from "react";
import "../../styles/AdminCss/Addproduct.css";
import { storage } from "../../firebase/Firebase.config";
import {
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";
import { Category } from "../../Utils/data";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import Subloader from "../../UI/Subloader";
import Loader from "../../UI/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../Redux/productSlice";
import { doc, setDoc, Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase.config";

const initialState = {
  title: "",
  price: "",
  category: "",
  brand: "",
  description: "",
  qty: "",
  imageURL: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);

  const productsEdit = products.find((editId) => editId.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productsEdit);

    return newState;
  });

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  //Handle all inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  ////detect form
  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  ////Handle image
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    setLoading(true);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Something went wrong. Try again!");
        setLoading(false);
        setTimeout(() => {
          toast.dismiss();
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setProduct({
            ...product,
            imageURL: downloadUrl,
          });
          setLoading(false);
          toast.success("Image uploaded successfully!!");
        });
      }
    );
  };

  ////Save Product
  const submitAddForm = (e) => {
    e.preventDefault();
    setSubmit(true);

    const { title, price, category, brand, description, qty, imageURL } =
      product;

    try {
      if (
        !title ||
        !price ||
        !category ||
        !brand ||
        !qty ||
        !description ||
        !imageURL
      ) {
        toast.error("Please fill all the fields first..");
        setSubmit(false);
      } else {
        const docRef = addDoc(collection(db, "shopverseItem"), {
          title: title,
          imageURL: imageURL,
          category: category,
          brand: brand,
          qty: Number(qty),
          price: Number(price),
          description: description,
          createdAt: Timestamp.now().toDate(),
        });
        setProduct({ ...initialState });
        setSubmit(false);
        navigate("/admin/view-product");
        toast.success("Produced Saved successfully");
      }
    } catch (err) {
      toast.error(err.message);
      setSubmit(false);
    }

    setProduct({
      title: "",
      price: "",
      category: "",
      brand: "",
      description: "",
      qty: "",
      imageURL: "",
    });
  };

  //deleteImage
  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, product.imageURL);
    deleteObject(deleteRef).then(() => {
      setProduct({
        ...product,
        imageURL: "",
      });
      setLoading(false);
      toast.success("Image deleted successfully!");
    });
  };

  ////Edit form
  const submitEditForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const { title, price, category, brand, description, qty, imageURL } =
      product;

    try {
      setDoc(doc(db, "shopverseItem", id), {
        title: title,
        imageURL: imageURL,
        category: category,
        brand: brand,
        qty: Number(qty),
        price: Number(price),
        description: description,
        createdAt: productsEdit.createdAt,
        editedAT: Timestamp.now().toDate(),
      });

      setLoading(false);
      toast.success("Product Edited Successfully!");
      navigate("/admin/view-product");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="addProductBar">
      {submit && <Loader />}

      <div className="productTitle">
        <h1>{detectForm(id, "ADD new Product", "Edit Product")}</h1>
      </div>

      <form
        onSubmit={detectForm(id, submitAddForm, submitEditForm)}
        className="productForm"
      >
        <div className="productName">
          <label name="title">Product Name</label>
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={product.title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {!product.imageURL ? (
          <div className="productImage">
            {loading && <Subloader />}
            <label name="image">Product Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
        ) : (
          <div className="liveImage">
            {loading && <Subloader />}
            <label>Product Image</label>
            <img src={product.imageURL} alt="" />
            <AiFillDelete className="imageDelete" onClick={deleteImage} />
          </div>
        )}

        <div className="productPrice">
          <label name="price">Product Price</label>
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="category">
          <label name="category">Product Category</label>
          <select
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- Choose Product Category --
            </option>
            {Category.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="productBrand">
          <label name="brand">Product Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Product Brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="productBrand">
          <label name="qty">Product Quantity</label>
          <input
            type="text"
            name="qty"
            placeholder="Product Quantity"
            value={product.qty}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="productDescription">
          <label name="description">Product Description</label>
          <textarea
            name="description"
            cols="10"
            rows="5"
            placeholder="Product Desccription"
            value={product.description}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="submitButton">
          <button>
            {detectForm(id, "Save Products", "Save Edited Products")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
