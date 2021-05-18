<template>
  <div class="questions-area">
    <div class="question-info">
      <div class="quis-block">
        <p class="title-font">
          CS100
        </p>
        <p class="title-font">
          Exam For Lesson One
        </p>
      </div>
      <div class="quis-block">
        <p class="title-font">
          05 : 23
        </p>
        <p class="title-font">
          Time Remaining
        </p>
      </div>
      <div class="questions-count">
        <span class="number done">1</span>
        <span class="number active">2</span>
        <span class="number">3</span>
        <span class="number">4</span>
        <span class="number">5</span>
        <span class="number">6</span>
        <span class="number">7</span>
        <span class="number">8</span>
        <span class="number">9</span>
        <span class="number">10</span>
      </div>
      <button class="next">
        {{ $t("next") }}
      </button>
    </div>
    <div class="quis-details">
      <p class="title-font">
        Your question is
      </p>
      <p class="quis">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
        doloremque, suscipit quo delectus maiores, assumenda velit, modi harum
        culpa veritatis sit! Molestiae consequatur explicabo facere inventore,
        quidem numquam natus architecto!
      </p>
      <p class="quis">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        qui voluptate totam quos quia pariatur perferendis commodi iusto
        adipisci doloribus, eum a modi quae quis hic ipsa iure unde vitae, quo
        mollitia odio veniam, ad. Adipisci vero repellendus odio harum voluptas,
        ullam eligendi earum distinctio ducimus minima dignissimos rerum ratione
        beatae asperiores quibusdam autem, possimus modi? Nesciunt dolorem
        perferendis corporis error, fugiat esse. Ex possimus debitis illum eos
        error est minima unde reprehenderit, quidem aut suscipit non
        consectetur, numquam in adipisci porro asperiores corporis vel enim cum
        nam ut! Necessitatibus fugit sunt distinctio doloribus earum recusandae,
        ut aut accusantium. Iure.
      </p>
      <div class="checkbox-container">
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
        <label class="checkbox">
          <input class="d-none" type="checkbox" />
          <i class="fas fa-check" />
          <span>Lorem ipsum dolor sit amet, consectetur.</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
};
</script>
