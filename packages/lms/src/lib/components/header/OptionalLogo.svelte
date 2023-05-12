<script lang="ts">
  import img from '/static/brand/acadamyOne/logo.png'

</script>

<div>
  <a href="/"><img src={img} alt="Brand Logo"/></a>
</div>


<style>
	div {
		grid-area: brand;
	}

  a {
		margin: 0;
		color: inherit;
		text-decoration: none;
		display: flex;
  }

  img {
    width: 20px;
    height: 20px; 
    border-radius: 50px;

  }

	h1 {
		margin: auto;
	}
</style>