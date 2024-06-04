import User from "../models/User.js"

export const create = (req, res) => {
    const newUser = new User({
        nama_lengkap: req.body.nama_lengkap,
        asal_sekolah: req.body.asal_sekolah,
        tahun_lulus: req.body.tahun_lulus,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    User.create(newUser, (err, data) => {
        if(err){
            res.status(500).send({msg:"Exist some error"})
        }
        res.send(data)
    })
}
export const findAll = (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    User.getAll(page, pageSize, (err, data)=>{
        if (err){
            console.log(err)
            res.status(500).send({msg: "exist some error"})
        }
        res.send(data)
    })
}

export const findOne = (req, res) =>{
    User.findById(req.params.id, (err, data) =>{
        if(err) {
            console.log(err)
            if (err.type === 'not_found' ){
                res.status(404).send ({
                    message: `not found user with id :${req.params.id}`
                })
                return
            }else {
                res.status(500).send({message: 'exist some error'})
            }
        }else{
            res.send(data)
        }
    })
}



export const update = (req, res) =>{
    const userData = new User (req.body)
    User.update(req.params.id, userData, (err, data)=>{
        if(err) {console.log(err);
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `not found user with id : ${req.params.id}` 
                })
            }else {
                res.status(500).send({msg:"exist some error"})
            }
        }else{
            res.send(data)
        }
    })
}

export const destroy = (req, res)=>{
    User.delete(req.params.id, (err, data)=>{
        if(err){
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `not found user with id : ${req.params.id}` 
                })
            }else {
                res.status(500).send({msg:"exist some error"})
            }
        }else {
            res.send({msg: "succes delete user"})
        }
    })
}