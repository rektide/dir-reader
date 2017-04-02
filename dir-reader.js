import { readDir as readDir } from 'md/fz'

export let defaults= {
	filterName: '.*js'
}

export class DirReader extends Promise{
	constructor( dir, opts){
		if( dir instanceof String){
			this.dir= dir
			dir= undefined
		}
		let filterFiles = this.filterFiles.bind( this)
		Object.assign( this, dir, opts, {filterFiles}, defaults)
		if( this.filterName instanceof String){
			this.filterName= new RegExp( this.filterName)
		}
		if( this.filterName instanceof RegExp){
			let filterRegex= this.filterName
			this.filterName= function( filename){
				return filterRegex.match( filename)
			}
		}
	}
	async readDir( dir){
		return readDir( dir|| this.dir)
			.then( this.filterFiles)
			.catch
	}
	filterFiles( files){
		files= files|| []
		return files.filter( filename=> this.filterName( filename))
	}
}

export { DirReader as default }
