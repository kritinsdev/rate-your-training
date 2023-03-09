<template>
  <div class="container">
    <div class="content">
      <div class="userControls">
        <p>Hello, <b>{{ userName }}</b></p>
        <button @click.prevent="logout">Logout</button>
    </div>
    <div v-if="!ratingSubmitted" class="form">
      <form @submit.prevent="submitRating">
        <div class="formControl">
          <label for="rating">Rate your training</label>
          <div class="chart-scale">
            <button type="button" class="btn btn-scale" v-for="i in 10" :key="i" :class="'btn-scale-desc-' + i" :data-rating="i"
            @click="setRating(i)">{{ i }}
            </button>
          </div>
          <input type="hidden" id="rating" name="rating" :value="rating">
        </div>

        <div class="formControl">
          <label for="comment">Your comment (anonymous)</label>
          <textarea name="comment" id="comment" cols="50" rows="5" :value="comment"></textarea>
        </div>

        <div class="formControl">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Thank you for submitting your rating!</p>
    </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'UserPanel',
  computed: {
    userData() {
      return JSON.parse(localStorage.getItem('userData'))
    },
    userName() {
      return this.userData ? this.userData.name : null
    }
  },  
  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      rating: null,
      comment: null,
      ratingSubmitted: false,
      submittingRating: false,
    }
  },
  methods: {
    logout() {
      // this.$emit('authenticated', false);
      localStorage.removeItem('userData');
      this.$router.push({ name: 'UserLogin' });
    },

    setRating(rating) {
      console.log(rating);
      this.rating = rating;
      const allRatingBtns = document.querySelectorAll('[data-rating]');
      const currentBtn = document.querySelector(`[data-rating="${rating}"]`);

      allRatingBtns.forEach((el) => {
        el.classList.remove('active')
      });

      currentBtn.classList.add('active');
    },
    submitRating(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      this.submittingRating = true;

      const userId = JSON.parse(localStorage.getItem('userData')).userId;
      const comment = event.target.elements.comment.value;

      // Create an object with the rating and comment data
      const data = {
        rating: this.rating,
        comment: comment,
        userId: userId
      };
      // Send a POST request to the server with the rating data
      fetch('http://localhost:3000/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            // Rating saved successfully, do something
            this.ratingSubmitted = true;
          } else {
            // Handle error
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // Hide the loading spinner
          this.submittingRating = false;
        });
    },
  },
};
</script>
  
<style scoped>
.userControls {
  display: flex;
  justify-content: space-between;
  width:100%;
}

.formControl {
  display: flex;
  flex-direction: column;
}

.formControl label {
  margin-bottom: 8px;
  font-weight: bold;
  text-align: left;
}

.formControl:not(:last-child) {
  margin-bottom: 16px;
}

textarea {
  font-family: inherit;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

.chart-scale {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.chart-scale button {
  min-width: 38px;
}

.btn-scale {
  text-align: center;
  font-weight: bold;
  color: black;
  font-family: 'Lato', sans-serif;
}

.btn-scale.active {
  scale: 1.25;
  border: 2px solid #eee;
}

.btn-scale-desc-10 {
  background-color: #33FF00;
}

.btn-scale-desc-10:hover {
  background-color: #2CDE00;
}

.btn-scale-desc-9 {
  background-color: #66FF00;
}

.btn-scale-desc-9:hover {
  background-color: #59DE00;
}

.btn-scale-desc-8 {
  background-color: #99FF00;
}

.btn-scale-desc-8:hover {
  background-color: #85DE00;
}

.btn-scale-desc-7 {
  background-color: #CCFF00;
}

.btn-scale-desc-7:hover {
  background-color: #B1DE00;
}

.btn-scale-desc-6 {
  background-color: #FFFF00;
}

.btn-scale-desc-6:hover {
  background-color: #DEDE00;
}

.btn-scale-desc-5 {
  background-color: #FFCC00;
}

.btn-scale-desc-5:hover {
  background-color: #DEB100;
}

.btn-scale-desc-4 {
  background-color: #FF9900;
}

.btn-scale-desc-4:hover {
  background-color: #DE8500;
}

.btn-scale-desc-3 {
  background-color: #FF6600;
}

.btn-scale-desc-3:hover {
  background-color: #DE5900;
}

.btn-scale-desc-2 {
  background-color: #FF3300;
}

.btn-scale-desc-2:hover {
  background-color: #DE2C00;
}

.btn-scale-desc-1 {
  background-color: #FF0000;
}

.btn-scale-desc-1:hover {
  background-color: #DE0000;
}
</style>