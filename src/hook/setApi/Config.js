const master = "authorization"

// const hosting = "https://localhost:5001"
// const ImageHosting = "https://localhost:5001"


const hosting = "https://kmspacking.com:5003"
const ImageHosting = "https://kmspacking.com:5003"
const tailer = "| KMS MACHINERY Co. Ltd | บริษัท เคเอ็มเอส แมชชีนเนอรี่ จำกัด"
const host = hosting + "/api"
const admin = host + "/admin"
const contact = host + "/contact"
const category = host + "/product"
const page = host + "/page"
const blog = host + "/blog"
const news = host + "/news"

const api = {
	mock: category + "/get",
	base64: category + "/get64base",
	admin,
	login: admin + "/login",
	user: admin + "/user",
	adduser: admin + "/addUser",
	deleteuser: admin + "/deleteUser",
	reset: admin + "/reset",
	change: admin + "/change",
	///Contact
	contact,
	addcontact: contact + "/addContact",
	updatecontact: contact + "/updateRead",
	deletecontact: contact + "/deleteContact",
	// category
	category,
	addcategory: category + "/addCategory",
	deletecategory: category + "/deleteCategory",
	idcategory: category + "/idCategory",
	updatecategory: category + "/update",
	//type
	type: category + "/type",
	addtype: category + "/addType",
	deletetype: category + "/deleteType",
	idtype: category + "/idType",
	updatetype: category + "/updateType",

	//Product
	machine: category + "/machine",
	addmachine: category + "/addMachine",
	deletemachine: category + "/deleteMachine",
	idmachine: category + "/idMachine",
	updatemachine: category + "/updateMachine",

	//Technical
	technical: category + "/technical",
	addtechnical: category + "/addTechnical",
	deletetechnical: category + "/deleteTechnical",
	updatetechnical: category + "/updateTechnical",

	// page
	pageHeader: page + "/header",
	pageIdHeader: page + "/idHeader",
	pageProduct: page + "/product",
	pageIdProduct: page + "/idproduct",

	//photo
	photo: blog + "/photoall",
	addPhoto: blog + "/addPhoto",
	deletePhoto: blog + "/deletePhoto",

	//blog
	contentBlog: blog + "/contentBlog",
	addBlog: blog + "/addBlog",
	updateBlog: blog + "/updateBlog",
	deleteBlog: blog + "/deleteBlog",
	idBlog: blog + "/idBlog",
	listBolg: blog + "/listBlogid",

	//news
	getNews:news + "/getNews",
	getNewsAll:news + "/getNewsAll",
	addNews:news + "/addNews",
	updateNews:news + "/updateNews",
	deleteNews:news + "/deleteNews",
	findNews:news + "/findNews",
	findNewsShow:news + "/findNewsShow",
	findNewsIdShow:news + "/findNewsIdShow",
	getTypeNews:news + "/getTypeNews",
}

export default {
	master,
	api,
	hosting,
	ImageHosting,
	tailer,
}
