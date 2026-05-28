function showToast(message, type){

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.className =
        "show " + type;

    setTimeout(() => {

        toast.className =
            toast.className.replace(
                "show",
                ""
            );

    }, 3000);
}

/* =========================
   REGISTER FORM
========================= */

const registerForm =
    document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener(
        "submit",
        async function(event){

            event.preventDefault();

            const name =
                document.getElementById("name").value;

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            const role =
                document.getElementById("role").value;

            /* EMPTY FIELD CHECK */

            if(
                name === "" ||
                email === "" ||
                password === ""
            ){

                showToast(
                    "Please fill all fields",
                    "error"
                );

                return;
            }

            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailPattern.test(email)){

                showToast(
                    "Invalid email format",
                    "error"
                );

                return;
            }

            /* PASSWORD VALIDATION */

            if(password.length < 6){

                showToast(
                    "Password must be at least 6 characters",
                    "error"
                );

                return;
            }

            const data = {

                name:name,

                email:email,

                password:password,

                role:role
            };

            try{

                const response = await fetch(
                    "http://localhost:8080/auth/register",
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":"application/json"
                        },

                        body:JSON.stringify(data)
                    }
                );

               const result =
                   await response.text();

                if(result ===
                    "User Registered Successfully"){

                    showToast(
                        result,
                        "success"
                    );

                    registerForm.reset();

                }else{

                    showToast(
                        result,
                        "error"
                    );
                }

            }catch(error){

                showToast(
                    "Something went wrong",
                    "error"
                );
            }
        }
    );
}

/* =========================
   LOGIN FORM
========================= */

const loginForm =
    document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener(
        "submit",
        async function(event){

            event.preventDefault();

            const email =
                document.getElementById(
                    "loginEmail"
                ).value;

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            /* EMPTY FIELD CHECK */

            if(
                email === "" ||
                password === ""
            ){

                showToast(
                    "Please fill all fields",
                    "error"
                );

                return;
            }

            const data = {

                email:email,

                password:password
            };

            try{

                const response = await fetch(
                    "http://localhost:8080/auth/login",
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":"application/json"
                        },

                        body:JSON.stringify(data)
                    }
                );

                const result =
                    await response.json();

                if(result.message ===
                    "Login Successful"){

                    showToast(
                        result.message,
                        "success"
                    );

                    /* SAVE ROLE */

                    sessionStorage.setItem(
                        "role",
                        result.role
                    );

                    setTimeout(() => {

                        /* ADMIN REDIRECT */

                        if(result.role === "ADMIN"){

                            window.location.href =
                                "/admin";

                        }else{

                            window.location.href =
                                "/";
                        }

                    }, 1200);

                }else{

                    showToast(
                        result.message,
                        "error"
                    );
                }

            }catch(error){

                showToast(
                    "Something went wrong",
                    "error"
                );
            }
        }
    );
}

/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener(
        "submit",
        async function(event){

            event.preventDefault();

            const name =
                document.getElementById(
                    "contactName"
                ).value;

            const email =
                document.getElementById(
                    "contactEmail"
                ).value;

            const message =
                document.getElementById(
                    "contactMessage"
                ).value;

            /* EMPTY FIELD CHECK */

            if(
                name === "" ||
                email === "" ||
                message === ""
            ){

                showToast(
                    "Please fill all fields",
                    "error"
                );

                return;
            }

            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailPattern.test(email)){

                showToast(
                    "Invalid email format",
                    "error"
                );

                return;
            }

            const data = {

                name:name,

                email:email,

                message:message
            };

            try{

                const response = await fetch(
                    "http://localhost:8080/contact/submit",
                    {
                        method:"POST",

                        headers:{
                            "Content-Type":"application/json"
                        },

                        body:JSON.stringify(data)
                    }
                );

                const result =
                    await response.text();

                showToast(
                    result,
                    "success"
                );

                contactForm.reset();

            }catch(error){

                showToast(
                    "Something went wrong",
                    "error"
                );
            }
        }
    );
}
/* =========================
   ADMIN DASHBOARD
========================= */

const messageContainer =
    document.getElementById(
        "messageContainer"
    );

if(messageContainer){

    loadMessages();
}

async function loadMessages(){

    try{

        const response = await fetch(
            "http://localhost:8080/contact/all"
        );

        const messages =
            await response.json();

        if(messages.length === 0){

            messageContainer.innerHTML = `
                <p>No messages found</p>
            `;

            return;
        }

        messageContainer.innerHTML = "";

        messages.forEach(message => {

            messageContainer.innerHTML += `

                <div class="message-card">

                    <h3>
                        <i class="fa-solid fa-user"></i>
                        ${message.name}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${message.email}
                    </p>

                    <p>
                        <strong>Message:</strong>
                        ${message.message}
                    </p>

                </div>
            `;
        });

    }catch(error){

        showToast(
            "Failed to load messages",
            "error"
        );
    }
}
/* =========================
   LOGOUT
========================= */

window.logout = function(){

    /* CLEAR SESSION */

    sessionStorage.removeItem("role");

    /* REDIRECT */

    window.location.replace("/login");
}


/* =========================
   PAGE PROTECTION
========================= */

window.addEventListener(
    "DOMContentLoaded",
    function(){

        const currentPage =
            window.location.pathname;

        const role =
            sessionStorage.getItem("role");

        /* ADMIN PAGE */

        if(currentPage.includes("/admin")){

            if(role !== "ADMIN"){

                window.location.replace("/login");
            }
        }

        /* USER PAGE */

        if(
            currentPage === "/" ||
            currentPage.includes("index")
        ){

            if(!role){

                window.location.replace("/login");
            }
        }
    }
);