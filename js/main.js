const navlinks = document.querySelectorAll(".navbar-nav .nav-link");
navlinks.forEach((link) => {
  link.addEventListener("click", function () {
    navlinks.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

async function loadMusicCarousel() {
  try {
    // Fetch file json mà Decap CMS tự động sinh ra
    const response = await fetch("data/music.json");
    const data = await response.json();
    const songs = data.songs || [];

    const musicContainer = document.getElementById("music-container");
    if (songs.length === 0) {
      musicContainer.innerHTML =
        '<p class="text-center text-muted">Chưa có bài hát nào được cập nhật.</p>';
      return;
    }

    let carouselHTML = "";

    // Vòng lặp gom nhóm cứ 3 bài hát vào 1 Slide (.carousel-item)
    for (let i = 0; i < songs.length; i += 3) {
      // Slide đầu tiên bắt buộc phải có class 'active' thì Bootstrap Carousel mới chạy
      const isActive = i === 0 ? "active" : "";

      carouselHTML += `<div class="carousel-item ${isActive}"><div class="row">`;

      // Lấy tối đa 3 bài cho slide hiện tại
      for (let j = i; j < i + 3 && j < songs.length; j++) {
        const song = songs[j];
        carouselHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="px-1">
                            <div class="ratio ratio-16x9 mb-3 rounded-2 overflow-hidden border border-2 border-white">
                                <iframe 
                                    src="https://www.youtube.com/embed/${song.youtube_id}?rel=0" 
                                    title="${song.title}" 
                                    allowfullscreen
                                    loading="lazy">
                                </iframe>
                            </div>
                            <h4 class="fw-semi-bold pb-3 text-truncate text-ocean text-center text-md-start" style="line-height: 2rem;">${song.title}</h4>
                        </div>
                    </div>
                `;
      }

      carouselHTML += `</div></div>`;
    }

    // Đổ toàn bộ HTML vừa dựng vào vùng chứa Carousel
    musicContainer.innerHTML = carouselHTML;
  } catch (error) {
    console.error("Lỗi khi đồng bộ dữ liệu sáo trúc:", error);
  }
}

// HÀM FETCH VÀ ĐỔ DỮ LIỆU DỰ ÁN (GIAO DIỆN CHUẨN THEO ẢNH MẪU - CHI TIẾT NẰM NGANG)
async function loadProjectCarousel() {
  try {
    const response = await fetch("data/projects.json");
    const data = await response.json();
    const projects = data.projects || [];

    const projectContainer = document.getElementById("project-container");
    if (projects.length === 0) {
      projectContainer.innerHTML =
        '<p class="text-center text-muted">Chưa có dự án nào được cập nhật.</p>';
      return;
    }

    let carouselHTML = "";

    for (let i = 0; i < projects.length; i++) {
      const isActive = i === 0 ? "active" : "";
      const proj = projects[i];

      // Tách chuỗi công nghệ (tech_stack) cách nhau bằng dấu phẩy thành mảng để tạo các Badge nhỏ giống ảnh mẫu
      const techArray = proj.tech_stack
        ? proj.tech_stack.split(",").map((tech) => tech.trim())
        : [];
      let techBadgesHTML = "";
      techArray.forEach((tech) => {
        if (tech) {
          techBadgesHTML += `<span class="badge bg-light text-dark border me-1 mb-1 px-2.5 py-1.5 fw-normal rounded-2">${tech}</span>`;
        }
      });

      carouselHTML += `
            <div class="carousel-item ${isActive}">
              <div class="row justify-content-center px-2">
                <div class="col-12 col-lg-10 mb-4">
                  <div class="card border-1 shadow rounded-4 overflow-hidden bg-white" style="border-color: var(--secondary-background-blue);" >
                    <div class="row g-0 align-items-stretch">
                      
                      <div class="col-12 col-md-5 col-lg-6">
                        <div class="h-100 min-vh-25 min-vh-md-100 position-relative overflow-hidden" style="min-height: 200px;">
                          <img src="${proj.image_url || "images/default-project.png"}" 
                               class="project-img w-100 h-100 object-fit-cover position-absolute top-0 start-0" 
                               alt="${proj.title}">
                        </div>
                      </div>

                      <div class="col-12 col-md-7 col-lg-6 d-flex flex-column p-4 p-md-5">
                        
                        <div class="d-flex justify-content-between align-items-start mb-3 gap-2">
                          <h3 class="fw-bold mb-0" style="color: var(--primary-word-blue); font-size: 1.65rem;">${proj.title}</h3>
                          <span class="rounded-2 px-3 py-1 small fw-semibold text-white" style="background-color: var(--primary-dark-blue)" >${proj.version || "v1.0"}</span>
                        </div>

                        <p class="card-text text-muted mb-4 flex-grow-1" 
                        style="line-height: 1.7rem; font-size: 0.95rem; text-align: justify; display: -webkit-box; -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical; overflow: hidden;">
                        ${proj.description}
                        </p>

                        <div class="mb-4">
                          <p class="small text-secondary fw-semibold mb-2"><i class="bi bi-tags-fill me-1"></i> Công nghệ:</p>
                          <div class="d-flex flex-wrap">
                            ${techBadgesHTML}
                          </div>
                        </div>

                        <div class="mt-auto">
                          <a href="${proj.download_url}" target="_blank" class="btn btn-dark text-white w-100 rounded-2 py-2.5 fw-semibold border-0 shadow-sm transition-all" style="background-color: #1a1a1a;">
                            <i class="bi bi-github pe-2 fs-5"></i> Xem trên GitHub
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
    }

    projectContainer.innerHTML = carouselHTML;
  } catch (error) {
    console.error("Lỗi khi đồng bộ dữ liệu dự án:", error);
  }
}

// 2. KÍCH HOẠT KHI TẢI TRANG VÀ THÊM LOGIC SWIPE DI ĐỘNG CHO CẢ 2 CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
  // Chạy fetch dữ liệu
  loadMusicCarousel();
  loadProjectCarousel();

  // Cấu hình vuốt chạm cho Project Carousel
  setupCarouselSwipe("projectCarousel");
  // Cấu hình vuốt chạm cho Music Carousel
  setupCarouselSwipe("musicCarousel");
});

// Hàm tái sử dụng logic vuốt chạm cho bất kỳ Carousel nào theo ID
function setupCarouselSwipe(carouselId) {
  const carouselEl = document.getElementById(carouselId);
  if (!carouselEl) return;

  const carousel = new bootstrap.Carousel(carouselEl, {
    touch: true,
    interval: false,
  });

  let touchStartX = 0;
  let touchEndX = 0;

  carouselEl.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  carouselEl.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) carousel.next();
      if (touchEndX > touchStartX + swipeThreshold) carousel.prev();
    },
    { passive: true },
  );
}

// Thêm tính năng vuốt màn hình để chuyển slide trên điện thoại
document.addEventListener("DOMContentLoaded", function () {
  const carouselEl = document.getElementById("musicCarousel");

  // Khởi tạo Carousel của Bootstrap một cách tường minh
  const carousel = new bootstrap.Carousel(carouselEl, {
    touch: true, // Bật tính năng touch mặc định của BS5
    interval: false, // Giữ nguyên không cho tự chạy
  });

  let touchStartX = 0;
  let touchEndX = 0;

  // Lắng nghe sự kiện chạm vào vùng carousel
  carouselEl.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  carouselEl.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  // Xác định hướng vuốt qua trái hay qua phải
  function handleSwipe() {
    const swipeThreshold = 50; // Khoảng cách tối thiểu bằng pixel để nhận diện vuốt
    if (touchEndX < touchStartX - swipeThreshold) {
      carousel.next(); // Vuốt sang trái -> Xem bài tiếp theo
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      carousel.prev(); // Vuốt sang phải -> Quay lại bài trước
    }
  }
});
// Chạy hàm khi trang web tải xong hoàn toàn
document.addEventListener("DOMContentLoaded", loadMusicCarousel);
