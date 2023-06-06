const socket = io("http://localhost:3030")

socket.on("connect", () => {  
    socket.on("namespacesList", namespacesList => {
        const namespaceElement = document.getElementById("namespaces");
        namespaceElement.innerHTML = ""
        for (const namespace of namespacesList) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerText = namespace.title;
            li.appendChild(p);
            namespaceElement.appendChild(li)  
        }
    })
}) 