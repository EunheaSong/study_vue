app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" />
      </div>
      <div class="priduct-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping : {{ shipping }}</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div
          class="color-circle"
          v-for="(variant, index) in variants"
          v-bind:key="variant.id"
          @mouseover="updateVariant(index)"
          v-bind:style="{ backgroundColor: variant.color }"
        ></div>
        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          v-on:click="addToCart"
          v-bind:disabled="!inStock"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" v-bind:reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastrey",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quntity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quntity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quntity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
