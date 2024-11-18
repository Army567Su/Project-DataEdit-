<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">รายการสินค้า</h1>
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Asset ID</th>
            <th>Serial Number</th>
            <th>ชื่อสินค้า</th>
            <th>ราคา (บาท)</th>
            <th>รุ่นสินค้า</th>
            <th>รูปภาพ</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ product.assetId }}</td>
            <td>{{ product.serialNumber }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.model }}</td>
            <td>
              <img v-if="product.image" :src="product.image" alt="Product Image" class="img-thumbnail" style="width: 100px;" />
              <span v-else>ไม่มีรูป</span>
            </td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editProduct(index)">แก้ไข</button>
              <button class="btn btn-danger btn-sm" @click="deleteProduct(index)">ลบ</button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="8" class="text-center">ยังไม่มีข้อมูลสินค้า</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductList",
    data() {
      return {
        products: JSON.parse(localStorage.getItem('products')) || [],
      };
    },
    methods: {
      // ฟังก์ชันลบสินค้า
      deleteProduct(index) {
        const products = this.products;
        if (confirm('คุณต้องการลบสินค้านี้ใช่ไหม?')) {
          products.splice(index, 1);
          localStorage.setItem('products', JSON.stringify(products));
          this.$router.go(0); // รีเฟรชหน้าใหม่
        }
      },
      // ฟังก์ชันแก้ไขสินค้า
      editProduct(index) {
        const product = this.products[index];
        this.$router.push({ path: '/edit-product', query: { product: JSON.stringify(product), index } });
      },
    },
  };
  </script>
  