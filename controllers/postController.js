const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');

/*
exports.view = async (req, res) => {
    const post = await Post.findOne({ slugx:req.params.slug });
    res.render('view', { post:post });
};
*/

exports.view = (req, res) => {
    res.render('view');
};

exports.add = (req, res) => {
    let obj = {
        pageTitle: "POSTS"
    }
    res.render('postAdd', obj);
};

exports.addAction = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());
    const post = new Post(req.body); //porque os campos do form possuem o mesmo nome do schema

    try {
        await post.save();
    } catch(error) {
        //req.flash('error', 'Erro: '+error.message);
        req.flash('error', 'Ocorreu um erro! Tente novamente mais tarde!');
        return res.redirect('/post/add');
        //return;
    }

    req.flash('sucess', 'Post salvo com sucesso!');
    res.redirect('/');
};


exports.edit = async (req, res) => {
    const post = await Post.findOne({ slugx:req.params.slug });

    res.render('postEdit', { post:post });
};

exports.editAction = async (req, res) => {
    req.body.slugx = slug(req.body.title, {lower:true});
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());

    try {
        const post = await Post.findOneAndUpdate(
            { slugx:req.params.slug }, 
            req.body,
            {
                new: true, //retorna NOVO item atualizado
                runValidators: true, //mantem as regras de validações
            }
        );
    } catch(error) {
        req.flash('error', 'Ocorreu um erro! Tente novamente mais tarde!');
        return res.redirect('/post/'+req.params.slug+'/edit');        
    };

    req.flash('sucess', 'Post atualizado com sucesso!');
    res.redirect('/');
};
