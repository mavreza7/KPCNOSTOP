```javascript
/* =========================================================
   KPC NO STOP — FINAL JAVASCRIPT
   Catalog / Filter / Modal / WhatsApp
========================================================= */


/* =========================================================
   PRODUCT DATABASE
========================================================= */

const products = [

    {
        id: "KPC 001",
        name: "KPC NO STOP TEE",
        category: "tshirt",
        categoryName: "T-SHIRT",
        price: 249000,
        image: "images/produk-01.jpg",
        status: "AVAILABLE",
        description:
            "KPC No Stop signature tee. Designed for everyday riding, street culture and those who keep moving.",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "KPC 002",
        name: "NO STOP BLACK TEE",
        category: "tshirt",
        categoryName: "T-SHIRT",
        price: 249000,
        image: "images/produk-02.jpg",
        status: "AVAILABLE",
        description:
            "Clean black tee with KPC No Stop identity. Simple, bold and made for everyday wear.",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "KPC 003",
        name: "KPC RIDER HOODIE",
        category: "hoodie",
        categoryName: "HOODIE",
        price: 399000,
        image: "images/produk-03.jpg",
        status: "AVAILABLE",
        description:
            "Heavy streetwear hoodie built for riders and everyday city movement.",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "KPC 004",
        name: "KPC RIDER JACKET",
        category: "jacket",
        categoryName: "JACKET",
        price: 549000,
        image: "images/produk-04.jpg",
        status: "AVAILABLE",
        description:
            "KPC riding jacket with a strong street silhouette for riders who never stop.",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        id: "KPC 005",
        name: "KPC CAP",
        category: "accessories",
        categoryName: "ACCESSORIES",
        price: 149000,
        image: "images/produk-05.jpg",
        status: "AVAILABLE",
        description:
            "KPC No Stop everyday cap. Minimal design with signature KPC identity.",
        sizes: ["ALL SIZE"]
    },

    {
        id: "KPC 006",
        name: "KPC SIGNATURE TEE",
        category: "tshirt",
        categoryName: "T-SHIRT",
        price: 279000,
        image: "images/produk-06.jpg",
        status: "SOLD OUT",
        description:
            "Signature KPC tee created for the No Stop community.",
        sizes: ["S", "M", "L", "XL"]
    }

];


/* =========================================================
   WHATSAPP NUMBER
========================================================= */

/*
   GANTI NOMOR DI BAWAH DENGAN NOMOR WHATSAPP KPC.

   Format:
   628xxxxxxxxxx

   Jangan menggunakan:
   +62
   08
   tanda -
   atau spasi
*/

const whatsappNumber = "6281234567890";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const productGrid =
    document.getElementById("productGrid");

const productModal =
    document.getElementById("productModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalCode =
    document.getElementById("modalCode");

const modalName =
    document.getElementById("modalName");

const modalPrice =
    document.getElementById("modalPrice");

const modalDescription =
    document.getElementById("modalDescription");

const orderButton =
    document.getElementById("orderButton");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navbar =
    document.querySelector(".navbar");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   CURRENT PRODUCT
========================================================= */

let currentProduct = null;

let selectedSize = null;


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(filter = "all") {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    const filteredProducts =
        filter === "all"
            ? products
            : products.filter(
                product => product.category === filter
            );


    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `
            <div class="empty-products">
                <p>NO PRODUCTS FOUND.</p>
            </div>
        `;

        return;
    }


    filteredProducts.forEach((product, index) => {

        const card =
            document.createElement("article");

        card.className = "product-card reveal";

        card.dataset.category =
            product.category;


        const soldOut =
            product.status.toLowerCase() === "sold out";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="${index < 4 ? "eager" : "lazy"}"
                    onerror="this.src='https://placehold.co/800x1000/111111/ffffff?text=KPC+NO+STOP'"
                >

                <span class="product-number">
                    ${product.id}
                </span>

                <span
                    class="product-status ${soldOut ? "sold-out" : ""}"
                >
                    ${product.status}
                </span>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.categoryName}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

            </div>

        `;


        if (!soldOut) {

            card.addEventListener(
                "click",
                () => openProduct(product)
            );

        } else {

            card.classList.add("is-sold-out");

        }


        productGrid.appendChild(card);

    });


    initRevealAnimations();

}


/* =========================================================
   OPEN PRODUCT MODAL
========================================================= */

function openProduct(product) {

    currentProduct = product;

    selectedSize = null;


    if (!productModal) return;


    modalImage.src = product.image;
    modalImage.alt = product.name;

    modalCode.textContent =
        product.id;

    modalName.textContent =
        product.name;

    modalPrice.textContent =
        formatPrice(product.price);

    modalDescription.textContent =
        product.description;


    /*
       UPDATE SIZE BUTTONS
    */

    const sizeButtons =
        document.querySelectorAll(".size-btn");


    sizeButtons.forEach(button => {

        button.classList.remove("active");

        const size =
            button.dataset.size;


        if (
            product.sizes.includes(size)
        ) {

            button.style.display = "";

        } else {

            button.style.display = "none";

        }

    });


    /*
       UPDATE ORDER BUTTON
    */

    orderButton.classList.remove("disabled");

    orderButton.style.pointerEvents = "none";

    orderButton.style.opacity = "0.45";

    orderButton.innerHTML = `
        SELECT SIZE
        <span>↓</span>
    `;


    /*
       OPEN MODAL
    */

    productModal.classList.add("active");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE PRODUCT MODAL
========================================================= */

function closeProduct() {

    if (!productModal) return;

    productModal.classList.remove("active");

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    currentProduct = null;

    selectedSize = null;

}


/* =========================================================
   SIZE SELECTION
========================================================= */

document.querySelectorAll(".size-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                if (!currentProduct) return;


                /*
                   RESET ACTIVE SIZE
                */

                document
                    .querySelectorAll(".size-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                /*
                   SET SELECTED SIZE
                */

                this.classList.add("active");

                selectedSize =
                    this.dataset.size;


                /*
                   ENABLE WHATSAPP BUTTON
                */

                orderButton.style.pointerEvents =
                    "auto";

                orderButton.style.opacity =
                    "1";

                orderButton.innerHTML = `
                    ORDER VIA WHATSAPP
                    <span>↗</span>
                `;

            }
        );

    });


/* =========================================================
   WHATSAPP ORDER
========================================================= */

if (orderButton) {

    orderButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            if (!currentProduct) return;


            if (!selectedSize) {

                alert(
                    "Silakan pilih ukuran terlebih dahulu."
                );

                return;

            }


            const message =

`Halo KPC No Stop 👋

Saya ingin order:

Produk:
${currentProduct.name}

Kode:
${currentProduct.id}

Harga:
${formatPrice(currentProduct.price)}

Size:
${selectedSize}

Apakah produk ini masih tersedia?`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   CLOSE MODAL EVENTS
========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProduct
    );

}


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeProduct
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            productModal.classList.contains("active")
        ) {

            closeProduct();

        }

    }
);


/* =========================================================
   PRODUCT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            /*
               REMOVE ACTIVE
            */

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            /*
               SET ACTIVE
            */

            this.classList.add("active");


            /*
               GET FILTER
            */

            const filter =
                this.dataset.filter;


            /*
               RENDER
            */

            renderProducts(filter);

        }
    );

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            menuToggle.classList.toggle(
                "active"
            );

            navMenu.classList.toggle(
                "active"
            );

        }
    );


    /*
       CLOSE MENU AFTER CLICK
    */

    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menuToggle.classList.remove(
                        "active"
                    );

                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function handleNavbar() {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleNavbar,
    { passive: true }
);

handleNavbar();


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function initRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".reveal:not(.observer-ready)"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            element =>
                element.classList.add("visible")
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(element => {

        element.classList.add(
            "observer-ready"
        );

        observer.observe(element);

    });

}


/* =========================================================
   SMOOTH ANCHOR
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute("href");


                if (
                    targetID === "#" ||
                    !targetID
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
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


/* =========================================================
   YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   IMAGE PRELOAD
========================================================= */

function preloadImages() {

    products.forEach(product => {

        const image =
            new Image();

        image.src =
            product.image;

    });

}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        preloadImages();


        const loader =
            document.getElementById(
                "loader"
            );


        if (loader) {

            setTimeout(
                () => {

                    loader.classList.add(
                        "hide"
                    );

                },
                700
            );

        }

    }
);


/* =========================================================
   INITIAL RENDER
========================================================= */

renderProducts("all");


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%c KPC NO STOP ",
    "background:#fff;color:#000;font-weight:bold;padding:8px 15px;"
);

console.log(
    "NO STOP. KEEP MOVING."
);
```
