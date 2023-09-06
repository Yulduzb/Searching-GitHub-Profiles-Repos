const Api_url='https://api.github.com/users/'


const form=document.getElementById('form');
const searchInput=document.getElementById('search');
const main=document.querySelector(".main");




async function getUser(username){
    try{
        const {data}=await axios(Api_url+username);
        createCard(data);
        getRepos(username);
    }catch (err) {
      createErrorCart("This username was not found :(");
    }
}


form.addEventListener("submit",(event)=>{
    event.preventDefault()// Sayfa yeniden yüklenmesini veya başka bir sayfaya yönlendirmeyi engeller

    const user=searchInput.value
    if(user){
        getUser(user);
        searchInput.value="";
    }
})

const createCard=(user)=>{
    const Card=document.createElement("div");
    Card.classList.add("card");

    const userName=user.name || user.login;
    const userBio=user.bio ? `<p>${user.bio}</p>` : '';
const CardHtml=`

<img class="user-image" src="${user.avatar_url}" alt="user image">
<div class="card-info">
    <div class="user-name">
        <h2>${userName}</h2>
        <small>${user.login}</small>
    </div>
</div>

<p>${userBio}</p>

<ul>
    <li>
        <i class="fa-solid fa-user-group"></i> ${user.followers} <strong>Followers</strong>
    </li>
    <li>
    ${user.following} <strong>Following</strong></i>
    </li>
    <li>
        <i class="fa-solid fa-bookmark"></i> ${user.public_repos}  <strong>Repository</strong></i>
    </li>
</ul>

<div class="repos" id="repos">

</div>


`
Card.innerHTML=CardHtml
main.appendChild(Card);
}

const createErrorCart=(msg)=>{
const Card=document.createElement("div");
Card.classList.add("card");
const errorcartHtml=`<h2>${msg}</h2>`
Card.innerHTML=errorcartHtml;
main.appendChild(Card);
}

async function getRepos(username){
    try{
       const{data}=await axios(Api_url+username+"/repos");
       addRepoCard(data);
    }catch(err){
       createErrorCart("Repository not found :(")
    }
}

 const addRepoCard=(repos)=>{
    const repoElement=document.getElementById('repos');
    repos.slice(0,3).forEach((repo)=>{
        const repoLink=document.createElement("a");
        repoLink.href=repo.html_url;
        console.log(repoLink.href);
        repoLink.target="_blank";
        repoLink.innerHTML=`<i class="fa-solid fa-bookmark"></i>${repo.name}`

        repoElement.appendChild(repoLink);
    })
 }