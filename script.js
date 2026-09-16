/* =========================================================
   KPC NO STOP — SCRIPT.JS
   FINAL FIX
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const whatsappNumber = "6281234567890";

const instagramURL = "https://www.instagram.com/kpc_nostop/";


/* =========================================================
   PRODUCT DATABASE
   Tambahkan produk baru di bagian ini
   ========================================================= */

const products = [
    {
        id: "KPC-001",
        name: "KPC NO STOP TEE",
        category: "tshirt",
        price: 249000,
        image: "011.png",
        status: "AVAILABLE",
        sizes: ["S", "M", "L", "XL"],
        description:
            "KPC No Stop Tee dengan karakter streetwear dan motorcycle culture. Cocok untuk riding maupun daily wear."
    },

    {
        id: "KPC-002",
        name: "NO STOP BLACK TEE",
        category: "tshirt",
        price: 249000,
        image: "015.png",
        status: "AVAILABLE",
        sizes: ["S", "M", "L", "XL"],
        description:
            "Black tee dengan desain clean dan bold khas KPC No Stop."
    },

    {
        id: "KPC-003",
        name: "KPC RIDER HOODIE",
        category: "hoodie",
        price: 399000,
        image: "images/produk-03.jpg",
        status: "AVAILABLE",
        sizes: ["S", "M", "L", "XL"],
        description:
            "Hoodie premium untuk rider dengan tampilan heavyweight street style."
    },

    {
        id: "KPC-004",
        name: "KPC RIDER JACKET",
        category: "jacket",
        price: 549000,
        image: "images/produk-04.jpg",
        status: "AVAILABLE",
        sizes: ["S", "M", "L", "XL"],
        description:
            "Rider jacket dengan karakter tegas untuk melengkapi style KPC No Stop."
    },

    {
        id: "KPC-005",
        name: "KPC CAP",
        category: "accessories",
        price: 149000,
        image: "images/produk-05.jpg",
        status: "AVAILABLE",
        sizes: ["ALL SIZE"],
        description:
            "KPC No Stop cap untuk melengkapi outfit riding dan streetwear."
    },

    {
        id: "KPC-006",
        name: "KPC SIGNATURE TEE",
        category: "tshirt",
        price: 279000,
        image: "images/produk-06.jpg",
        status: "SOLD OUT",
        sizes: ["S", "M", "L", "XL"],
        description:
            "Signature tee dengan desain eksklusif KPC No Stop."
    }
];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const productGrid = document.getElementById("productGrid");

const modal = document.getElementById("productModal");

const modalImage = document.getElementById("modalImage");
const modalCode = document.getElementById("modalCode");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSizes = document.getElementById("modalSizes");

const orderButton = document.getElementById("orderButton");

const closeModalButton = document.getElementById("closeModal");

const filterButtons = document.querySelectorAll(".filter-btn");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navbar = document.querySelector(".navbar");


/* =========================================================
   STATE
   ========================================================= */

let selectedProduct = null;
let selectedSize = null;


/* =========================================================
   FORMAT RUPIAH
   ========================================================= */

function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number);
}


/* =========================================================
   FALLBACK IMAGE
   Tidak menggunakan website eksternal
   ========================================================= */

function getFallbackImage(productName = "KPC NO STOP") {

    const safeName = productName
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="800"
             height="1000"
             viewBox="0 0 800 1000">

            <rect width="800"
                  height="1000"
                  fill="#111111"/>

            <rect x="35"
                  y="35"
                  width="730"
                  height="930"
                  fill="none"
                  stroke="#ffffff"
                  stroke-opacity="0.15"
                  stroke-width="2"/>

            <text x="400"
                  y="440"
                  text-anchor="middle"
                  fill="#ffffff"
                  font-size="72"
                  font-family="Arial, sans-serif"
                  font-weight="900">
                KPC
            </text>

            <text x="400"
                  y="510"
                  text-anchor="middle"
                  fill="#ffffff"
                  font-size="34"
                  font-family="Arial, sans-serif"
                  letter-spacing="6">
                NO STOP
            </text>

            <text x="400"
                  y="575"
                  text-anchor="middle"
                  fill="#888888"
                  font-size="20"
                  font-family="Arial, sans-serif">
                ${safeName}
            </text>

        </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}


/* =========================================================
   IMAGE ERROR HANDLER
   ========================================================= */

function handleImageError(imageElement, productName) {

    if (!imageElement) return;

    imageElement.onerror = null;

    imageElement.src = getFallbackImage(productName);
}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts(filter = "all") {

    if (!productGrid) {
        console.warn("productGrid tidak ditemukan.");
        return;
    }

    const filteredProducts =
        filter === "all"
            ? products
            : products.filter(product => product.category === filter);


    /* CLEAR GRID */

    productGrid.innerHTML = "";


    /* EMPTY STATE */

    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `
            <div class="empty-products">
                <p>Produk belum tersedia.</p>
            </div>
        `;

        return;
    }


    /* CREATE PRODUCT CARD */

    filteredProducts.forEach((product, index) => {

        const card = document.createElement("article");

        card.className = "product-card reveal";

        card.dataset.category = product.category;

        const soldOut =
            product.status.toUpperCase() === "SOLD OUT";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    decoding="async"
                >

                <span class="product-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="product-status ${soldOut ? "sold-out" : ""}">
                    ${product.status}
                </span>

                <div class="product-overlay">
                    <span>VIEW PRODUCT</span>
                </div>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category.toUpperCase()}
                </span>

                <h3>${product.name}</h3>

                <div class="product-bottom">

                    <strong>
                        ${formatRupiah(product.price)}
                    </strong>

                    <button
                        class="view-product"
                        type="button"
                        aria-label="Lihat ${product.name}"
                    >
                        VIEW
                    </button>

                </div>

            </div>
        `;


        /* IMAGE FALLBACK */

        const image = card.querySelector("img");

        if (image) {

            image.addEventListener("error", () => {
                handleImageError(image, product.name);
            });

        }


        /* OPEN MODAL */

        card.addEventListener("click", () => {

            openProduct(product);

        });


        productGrid.appendChild(card);

    });


    /* REFRESH REVEAL */

    initializeRevealAnimations();
}


/* =========================================================
   OPEN PRODUCT MODAL
   ========================================================= */

function openProduct(product) {

    if (!modal) return;

    selectedProduct = product;

    selectedSize = null;


    /* IMAGE */

    if (modalImage) {

        modalImage.onerror = null;

        modalImage.src = product.image;

        modalImage.alt = product.name;

        modalImage.onerror = () => {

            handleImageError(
                modalImage,
                product.name
            );

        };
    }


    /* TEXT */

    if (modalCode) {
        modalCode.textContent = product.id;
    }

    if (modalName) {
        modalName.textContent = product.name;
    }

    if (modalPrice) {
        modalPrice.textContent =
            formatRupiah(product.price);
    }

    if (modalDescription) {
        modalDescription.textContent =
            product.description;
    }


    /* SIZE */

    renderSizes(product);


    /* ORDER BUTTON */

    if (orderButton) {

        if (
            product.status.toUpperCase() ===
            "SOLD OUT"
        ) {

            orderButton.disabled = true;

            orderButton.textContent =
                "SOLD OUT";

            orderButton.classList.add(
                "disabled"
            );

        } else {

            orderButton.disabled = false;

            orderButton.textContent =
                "ORDER VIA WHATSAPP";

            orderButton.classList.remove(
                "disabled"
            );
        }
    }


    /* SHOW MODAL */

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


/* =========================================================
   CLOSE PRODUCT MODAL
   ========================================================= */

function closeProduct() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

    selectedProduct = null;

    selectedSize = null;
}


/* =========================================================
   RENDER SIZE BUTTONS
   ========================================================= */

function renderSizes(product) {

    if (!modalSizes) return;

    modalSizes.innerHTML = "";


    product.sizes.forEach((size, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "size-btn";

        button.textContent = size;


        /* DEFAULT FIRST SIZE */

        if (index === 0) {

            button.classList.add("active");

            selectedSize = size;
        }


        /* CLICK SIZE */

        button.addEventListener("click", () => {

            modalSizes
                .querySelectorAll(".size-btn")
                .forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


            button.classList.add("active");

            selectedSize = size;

        });


        modalSizes.appendChild(button);

    });

}


/* =========================================================
   WHATSAPP ORDER
   ========================================================= */

function orderViaWhatsApp() {

    if (!selectedProduct) return;


    /* SOLD OUT */

    if (
        selectedProduct.status.toUpperCase() ===
        "SOLD OUT"
    ) {

        return;

    }


    /* SIZE */

    if (!selectedSize) {

        alert(
            "Silakan pilih ukuran terlebih dahulu."
        );

        return;

    }


    const message =

`Halo KPC No Stop 👋

Saya ingin order:

Produk: ${selectedProduct.name}
Kode: ${selectedProduct.id}
Ukuran: ${selectedSize}
Harga: ${formatRupiah(selectedProduct.price)}

Apakah produk ini masih tersedia?

Terima kasih.`;



    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   FILTER PRODUCTS
   ========================================================= */

function initializeFilters() {

    if (!filterButtons.length) return;


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter || "all";


            /* ACTIVE BUTTON */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            /* RENDER */

            renderProducts(filter);

        });

    });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    if (!menuToggle || !navMenu) return;


    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        navMenu.classList.toggle("active");

        document.body.classList.toggle(
            "menu-open"
        );

    });


    /* CLOSE WHEN CLICK LINK */

    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove(
                    "active"
                );

                navMenu.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

function initializeNavbar() {

    if (!navbar) return;


    function updateNavbar() {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();

}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal:not(.reveal-ready)"
        );


    if (!elements.length) return;


    /* Mark initialized */

    elements.forEach(element => {

        element.classList.add(
            "reveal-ready"
        );

    });


    /* Intersection Observer */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        elements.forEach(element => {

            observer.observe(element);

        });

    } else {

        /* Fallback browser lama */

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initializeSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) return;


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        + window.scrollY
                        - navbarHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });

}


/* =========================================================
   MODAL EVENTS
   ========================================================= */

function initializeModal() {

    if (!modal) return;


    /* CLOSE BUTTON */

    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeProduct
        );

    }


    /* CLICK OUTSIDE MODAL */

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeProduct();

            }

        }
    );


    /* ESC KEY */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeProduct();

            }

        }
    );


    /* ORDER BUTTON */

    if (orderButton) {

        orderButton.addEventListener(
            "click",
            orderViaWhatsApp
        );

    }

}


/* =========================================================
   INSTAGRAM LINK
   ========================================================= */

function initializeInstagramLinks() {

    document
        .querySelectorAll(
            'a[href*="instagram.com"]'
        )
        .forEach(link => {

            link.href = instagramURL;

            link.target = "_blank";

            link.rel =
                "noopener noreferrer";

        });

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initializeCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "#currentYear, .current-year"
        );


    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent = year;

    });

}


/* =========================================================
   LOADER — FINAL FIX
   ========================================================= */

/*
   Loader TIDAK lagi menunggu semua gambar selesai.

   Jadi walaupun gambar:
   - belum ada
   - lambat
   - gagal
   - internet lambat

   halaman tetap akan masuk.
*/

function hideLoader() {

    const loader =
        document.getElementById("loader");


    if (!loader) return;


    loader.classList.add("hide");


    /* FORCE REMOVE */

    setTimeout(() => {

        loader.style.display = "none";

    }, 900);

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeApp() {

    console.log(
        "KPC No Stop — Website initialized."
    );


    /* PRODUCTS */

    renderProducts("all");


    /* FEATURES */

    initializeFilters();

    initializeMobileMenu();

    initializeNavbar();

    initializeRevealAnimations();

    initializeSmoothScroll();

    initializeModal();

    initializeInstagramLinks();

    initializeCurrentYear();


    /*
       Loader dihilangkan setelah DOM siap.
       Tidak menunggu gambar.
    */

    setTimeout(() => {

        hideLoader();

    }, 500);

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp,
        { once: true }
    );

} else {

    initializeApp();

}


/* =========================================================
   EMERGENCY LOADER FALLBACK
   ========================================================= */

/*
   Jika ada error JavaScript lain,
   loader tetap akan dipaksa hilang.
*/

setTimeout(() => {

    hideLoader();

}, 3500);
