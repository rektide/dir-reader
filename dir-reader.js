import { readdir } from 'mz/fs'

export let defaults= {
}

export class DirReader extends Promise{
	constructor( dir, opts){
		super((resolve, reject)=> {
			_resolve= resolve
			_reject= reject
		})
		var _resolve, _reject

		if( typeof(dir) == 'string'){
			dir= {dir}
		}
		let filterFiles = this.filterFiles.bind( this)
		Object.assign( this, dir, opts, {filterFiles}, defaults)
		readdir( this.dir)
			.then( this.filterFiles)
			.then( _resolve, _reject)
	}

	filterFiles( files){
		if( !files){
			return []
		}
		if( this.include&& this.include.constructor == String){
			this.include = new RegExp( this.include)
		}
		if( this.include instanceof RegExp){
			let include= this.include
			this.include= file=> include.test( file)
		}
		files= this.include? files.filter( this.include): files

		if( this.exclude&& this.exclude.constructor == String){
			this.exclude = new RegExp( this.exclude)
		}
		if( this.exclude instanceof RegExp){
			let exclude= this.exclude
			this.exclude= file=> exclude.test( file)
		}
		files= this.exclude? files.filter( file=> !this.exclude( file)): files
		return files
	}
}

export { DirReader as default }
