fs = Meteor.npmRequire('fs');
base_path = fs.realpathSync( process.cwd() + '/../' );
base_path = base_path.split('\\').join('/');
base_path = base_path.replace(/\/\.meteor.*$/, '');
console.log( base_path );
Router.map(function() {
    this.route('serverFile', {
        where: 'server',
        path: /^\/images\/(.*)$/,
        action: function() {
           var filePath =  base_path+'/uploads/' + this.params;
		   console.log('path:'+filePath);
           var data = fs.readFileSync(filePath);
           this.response.writeHead(200, {
                'Content-Type': 'image'
           });
           this.response.write(data);
           this.response.end();
        }
    });
});

 Meteor.methods({
	 baseUrl: function(){
		//var baseUrl = Meteor.npmRequire('fs').realpathSync( process.cwd() );
		//baseUrl = baseUrl.split('\\').join('/');
		basePath = Meteor.absoluteUrl.defaultOptions.rootUrl;
		return basePath;
	 },
	 basePath: function(){
		var base_path = Meteor.npmRequire('fs').realpathSync( process.cwd() + '../../' );
		base_path = base_path.split('\\').join('/');
		baseDir = base_path.replace(/\/\.meteor.*$/, '');
		return baseDir;
	 },
 });