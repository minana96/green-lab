define([

],
function(

) {
	return Backbone.View.extend({

		// keep cache of imgs for when we re-render
		image_cache: {},

		name: 'Columns',
		parentView: null,

		// test that thumb titles are position: absolute
		absolute_titles: false,

		/**
		 * Set attributes to el for layout options.
		 *
		 * @return {Object} attributes
		 */
		attributes: function () {
			var model_data = this.model.get('data')

			var attributes = {
				'thumbnails': this.name.toLowerCase(),
				'grid-row'   : '',
				'thumbnails-pad'   : '',
				'thumbnails-gutter': '',
				'data-elementresizer': ''				
			};

			var padding = this.model.get('mobile_active') ? parseFloat(this.model.get('data').responsive_thumbnails_padding) : parseFloat(this.model.get('data').thumbnails_padding)
			if ( padding == 0){
				attributes['data-padding-zero'] = ''
			}

			return attributes;
		},

		/**
		 * Bind event listeners.
		 *
		 * @return {Object} this
		 */
		initialize: function (options) {
			if(options && options.parentView) {
				this.parentView = options.parentView;
			}

			// this.collection = page collection. Render on change
			this.listenTo(this.collection, 'update', this.render);
			this.listenTo(this.collection, 'sync', this.render);
			
			// this.model = thumbnail settings. Render on change to dynamically update
			this.listenTo(this.model, 'change', this.handleUpdates);

			// re-render thumbnails when collection is changed
			this.listenTo(this.collection, 'change', this.collectionChange);

			// Listener for when this view begins editing after it is first rendered
			// for a static way to check if we are editing use:
			// this.parentView.isEditing()
			this.listenTo(this.parentView, 'is_editing', function(isEditing) {
				// Do your thing
			});

			this.buildImageCacheCallback = this.buildImageCache.bind(this)
			Cargo.Event.on('elementresizer_update_complete', this.buildImageCacheCallback );			

			return this;
		},

		remove: function(){
		    Cargo.Event.off("elementresizer_update_complete",this.buildImageCacheCallback)	
			Backbone.View.prototype.remove.apply(this, arguments);
		},

		/**
		 * Fired when a collection has changed
		 * Check to see if there is thumb_meta data in the 
		 * attributes and if so, re-render
		 * @param  {Object} model The model that has changed
		 */
		collectionChange: function(model) {
			var allow_change = ['thumb_meta', 'title', 'tags'];
			var has_change = _.findKey(model.changedAttributes(), function(value, key, object){ return (_.indexOf(allow_change, key) >= 0); });
			
			// There was a change to the thumb data, run an update
			if(has_change !== undefined) {
				this.render();
			}
		},


		/**
		 * Handle the changes to the model triggered from the admin panel
		 * @param  {Object} event
		 * @param  {Object} options sent from settings model, changing and value
		 */		
		handleUpdates: function(event, options){
			if ( !options){
				return
			}

			if ( this.hidden ){
				return
			}

			var model_data = this.model.get('data')

			switch (options.changing) {

				case 'responsive_thumbnails_padding':
				case 'thumbnails_padding':
					this.render();
					break;

				case 'mobile_active':
					if ( model_data.responsive ){
						this.render();	
					}
					break;

				case 'responsive':
					if ( this.model.get('mobile_active')){
						this.render();	
					}
    				break;

				case 'thumbnail_mode':
					break;

				case 'metadata':
					break;

				case 'crop':
					this.render();
					break;

				case 'responsive_columns':
				case 'columns':
					this.render();
					break;					

				case 'thumb_crop':
					this.render();
					break;					

				case 'show_tags':
					this.render();
					break;		

				case 'show_thumbs':
					if ( model_data.show_thumbs ){
						this.render();						
					}
					break;

				case 'show_title':
					this.render();
					break;	

				case 'show_excerpt':
					this.render();
					break;			

				default:
				    break;	
			}

		},

		/**
		 * @return {Object} this
		 */

		render: function () {

			var _this = this;
			var model_data = _.clone(this.model.get('data'));

			if ( this.model.get('mobile_active') && model_data.responsive){
				model_data = _.extend(model_data, model_data.mobile_data);	
			}

			var padding = parseFloat(model_data.thumbnails_padding)
			var col_padding_ratio = 0;

			var caption_padding_ratio;

			if ( this.absolute_titles ){
				caption_padding_ratio = 0;

			} else {

				var caption_measure = document.createElement('DIV')
				caption_measure.className = 'column'
				caption_measure.setAttribute('grid-col', 'x'+model_data.column_size)	
				caption_measure.setAttribute('grid-pad', model_data.thumbnails_padding)	
				caption_measure.innerHTML = '<div class="thumbnail"><a><div class="title"><span>Testing Text</span></div></a></div>'

				this.el.appendChild(caption_measure);
				var caption_inner = caption_measure.querySelector('.title');

				caption_padding_ratio = caption_inner.offsetHeight/caption_inner.offsetWidth 

				if ( window.getComputedStyle(caption_inner).position == 'absolute' ){
					this.absolute_thumbs = true;
					caption_padding_ratio =0;					
				}

			}

			if ( padding != 0){
				this.el.removeAttribute('data-padding-zero')

				var measurement_wrapper = document.createElement('DIV')
					measurement_wrapper.setAttribute('thumbnails-pad', model_data.thumbnails_padding)
					measurement_wrapper.style.boxSizing = "border-box"
					measurement_wrapper.style.width = "100%"
					measurement_wrapper.style.height = "10px"

				var measurement_inner = document.createElement('DIV')
					measurement_inner.style.width = "100%"
					measurement_inner.style.boxSizing = "border-box"					
					measurement_inner.style.height = "10px"
					measurement_inner.className = "measure_inner"

				measurement_wrapper.appendChild(measurement_inner)
				this.el.appendChild(measurement_wrapper)

				var measure_div_container = document.createElement('DIV');

				measure_div_container.style.cssText = 'position: fixed; top: -999px; left: -9999px; width: 0;'

				for (var j = 0; j < 10; j++){
					var measure_div = document.createElement('DIV')
					measure_div.setAttribute('thumbnails-pad', '')
					measure_div_container.appendChild(measure_div)
				}

				this.el.appendChild(measure_div_container)

				var pad_size = measure_div_container.offsetHeight / 10;

				col_padding_ratio = pad_size / ((measurement_inner.offsetWidth / parseInt(model_data.columns)) - pad_size) 

				if ( isNaN(col_padding_ratio) || col_padding_ratio == undefined ){

					if ( this.cached_padding_ratio !== undefined) {
						col_padding_ratio = this.cached_padding_ratio
					} else {
						col_padding_ratio = 0
					
					}

				} else {
					this.cached_padding_ratio = col_padding_ratio	

				}

			} else {

				this.el.setAttribute('data-padding-zero', '')
				col_padding_ratio = 0;

			}


			var pages = this.collection.toJSON();

			var column_heights = [];
			var shortest_column = 0;
			var columns = [];			

			for (var i = 0; i < model_data.columns; i++){ 
				column_heights[i] = 0;
				columns[i] = new Array();
			}

			_.each(pages, function(page){ 

				var shortest_height = 9e9;

				for (var j =0; j < column_heights.length; j++){

					if ( column_heights[j] < shortest_height){
						shortest_height = column_heights[j];
						shortest_column = j;
					}
					
				}

				if ( 
					_.has(page, 'thumb_meta') && 
					page.thumb_meta && 
					page.thumb_meta.thumbnail_crop && 
					page.thumb_meta.thumbnail_crop.imageModel
				){

					column_heights[shortest_column]+= (parseInt(page.thumb_meta.thumbnail_crop.imageModel.height)/parseInt(page.thumb_meta.thumbnail_crop.imageModel.width)) + col_padding_ratio;	

				} else {

					column_heights[shortest_column]+= 1;

				}

				// make an educated guess at ratios for text
				// assuming a single line is maybe 6 times as wide as it is tall, we add that ratio
				// also adding a non-unique ratio for each thumbnail will not affect output, so it's commented out for now
				// if (model_data.show_title){
				// 	column_heights[shortest_column]+= .166
				// }

				// if ( model_data.show_tags){
				// 	column_heights[shortest_column]+= .166	
				// }



				columns[shortest_column].push(page)

			});

			// Load the template
			this.model.set('name', 'Columns', {silent: true});
			this.model.set('path', 'columns', {silent: true});
			
			var template = Cargo.Template.Get(this.model.get('name'), this.model.getTemplatePath());
			var data   = Cargo.API.GetDataPackage('Pages', this.collection.toJSON());
			data = _.extend(data, { 'settings' : model_data });			
			data = _.extend(data, { 'columns' : columns } );

			var markup = Cargo.Core.Handlebars.Render(template, data);

			// if we have images cached, then we use those instead for the initial markup to avoid 
			if ( this.image_cache.length > 0){

				var markup_holder = document.createElement('DIV')
				markup_holder.innerHTML = markup		
						
				for ( var k = 0; k < this.image_cache.length; k++){

					var mid = this.image_cache[k].getAttribute('data-mid')
					var rendered_image = markup_holder.querySelector('[data-mid="'+mid+'"]') || null

					if ( rendered_image ){
					var image_parent = rendered_image.parentNode || null

						image_parent.removeChild(rendered_image)
						image_parent.appendChild(this.image_cache[k])

					}

				}

				// debounce element resizer refresh since we already have rendered once,
				// and we are probably scrubbing the columns/padding slider in admin settings
				this.$el.html(markup_holder.innerHTML);				
				this.updateElementResizer();

			} else {

				this.$el.html(markup);				
				Cargo.Plugins.elementResizer.refresh()							

			}
			
			Cargo.Event.trigger('thumbnails_render_complete');
			return this;

		},

		updateElementResizer: _.debounce(function(){
			Cargo.Plugins.elementResizer.refresh()							
		}, 200),		

		buildImageCache: function(){

			this.image_cache = this.el.querySelectorAll('.thumb_image img')

		},

		hideThumbs: function(){
			this.hidden = true;
			this.el.style.display = "none"
		},

		showThumbs: function(){
			this.hidden = false
			this.el.style.display = "";
		}
	})
	

});
