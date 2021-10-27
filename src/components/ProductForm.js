import React from "react";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

const ProductForm = () => {
  const initialValue = {
    name: "",
    category: "",
    price: 0,
    desc: "",
    inStock: false,
    material: "",
  };
  const categoryArray = [
    "electronics",
    "garden",
    "automotive",
    "jewelery",
    "kids",
  ];
  const materialArray = ["soft", "hard"];

  let validationSchema = yup.object({
    name: yup.string().required("field required"),
    category: yup
      .string()
      .required("field required")
      .oneOf(
        categoryArray,
        "only electronics/garden/automotive/jewelery/kids available"
      ),
    price: yup
      .number()
      .required("field required")
      .lessThan(1000, "price less than 1000Rs"),
    desc: yup
      .string()
      .required("field required")
      .default("This is a good product"),
    inStock: yup.string().required("field required"),
    material: yup
      .string()
      .required("field required")
      .oneOf(materialArray, "either soft/hard only"),
  });

  const submitFun = (values) => {
    const { price, inStock } = values;
    console.log("price-b", typeof price, price);
    console.log("price-a", typeof parseInt(price), price);
    console.log("inStock-b", typeof inStock, inStock);
    console.log("inStock-a", typeof Boolean(inStock), inStock);
    console.log("Values after submit", values);
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={submitFun}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="name" />
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {categoryArray.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ErrorMessage name="category" />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                value={parseInt(formik.values.price)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="price" />
            </div>

            <div>
              <label htmlFor="inStock">Stock Availablity</label>
              {["yes", "no"].map((el) => (
                <div key={el}>
                  <label>{el === true ? "Available" : "Not-Available"}</label>
                  <input
                    type="radio"
                    name="inStock"
                    value={el}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              ))}
              <ErrorMessage name="inStock" />
            </div>

            <div>
              <label htmlFor="material">Material-Type</label>
              <input
                type="text"
                name="material"
                value={formik.values.material}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="material" />
            </div>

            <div>
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                placeholder="product desc..."
                {...formik.getFieldProps("desc")}
              />
              <ErrorMessage name="desc" />
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
