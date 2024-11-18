<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">ระบบลงทะเบียนสินค้า</h1>
  
      <div class="card p-4 mb-4">
        <h4 class="card-title mb-3">{{ productIndex !== null ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่' }}</h4>
        <form @submit.prevent="addOrEditProduct">
          <div class="row">
            <!-- Asset ID -->
            <div class="col-md-6">
              <label for="assetId" class="form-label">Asset ID</label>
              <input
                type="text"
                id="assetId"
                class="form-control"
                v-model="newProduct.assetId"
                required
              />
            </div>
  
            <!-- Serial Number -->
            <div class="col-md-6">
              <label for="serialNumber" class="form-label">Serial Number</label>
              <input
                type="text"
                id="serialNumber"
                class="form-control"
                v-model="newProduct.serialNumber"
                required
              />
            </div>
  
            <!-- Name -->
            <div class="col-md-6">
              <label for="productName" class="form-label">ชื่อสินค้า</label>
              <input
                type="text"
                id="productName"
                class="form-control"
                v-model="newProduct.name"
                required
              />
            </div>
  
            <!-- Price -->
            <div class="col-md-6">
              <label for="productPrice" class="form-label">ราคา (บาท)</label>
              <input
                type="number"
                id="productPrice"
                class="form-control"
                v-model="newProduct.price"
                required
              />
            </div>
  
            <!-- Model -->
            <div class="col-md-6">
              <label for="productModel" class="form-label">รุ่นสินค้า</label>
              <input
                type="text"
                id="productModel"
                class="form-control"
                v-model="newProduct.model"
                required
              />
            </div>
  
            <!-- Image Upload -->
            <div class="col-md-6">
              <label for="productImage" class="form-label">เพิ่มรูปภาพ</label>
              <input
                type="file"
                id="productImage"
                class="form-control"
                @change="handleImageUpload"
                accept="image/*"
              />
            </div>
          </div>
  
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary">{{ productIndex !== null ? 'บันทึกการแก้ไข' : 'บันทึก' }}</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Dashboard",
    data() {
      return {
        newProduct: {
          assetId: "",
          serialNumber: "",
          name: "",
          price: "",
          model: "",
          image: null,
        },
        productIndex: null,
      };
    },
    created() {
      if (this.$route.query.product) {
        const product = JSON.parse(this.$route.query.product);
        this.newProduct = { ...product };
        this.productIndex = this.$route.query.index;
      }
    },
    methods: {
  // ฟังก์ชันจัดการการเพิ่มและแก้ไขสินค้า
  addOrEditProduct() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // ตรวจสอบว่า image เป็นไฟล์จริงๆ ก่อนที่จะสร้าง URL
    let imageURL = null;
    if (this.newProduct.image && this.newProduct.image instanceof File) {
      imageURL = URL.createObjectURL(this.newProduct.image);
    }

    // ถ้าเป็นการเพิ่มสินค้าใหม่
    if (this.productIndex === null) {
      products.push({ ...this.newProduct, image: imageURL });
    } else {
      // ถ้าเป็นการแก้ไขสินค้า
      products[this.productIndex] = { ...this.newProduct, image: imageURL };
    }

    // บันทึกข้อมูลใน localStorage
    localStorage.setItem('products', JSON.stringify(products));
    this.$router.push('/product-list');
  },

  // ฟังก์ชันจัดการการอัพโหลดรูปภาพ
  handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file instanceof File) {
      this.newProduct.image = file;
    }
  },

  // ฟังก์ชันอื่นๆ ที่คุณต้องการ
}

  };
  </script>
  