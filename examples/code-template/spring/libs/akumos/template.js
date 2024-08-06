
              class Template {
                map = new Map();
                path;
                template;
                name;

                get map() { return this.map }
                get path() { return this.path }
                get template() { return this.template }
                get name() { return this.name }

                set map(v) { this.map = v }
                set path(v) { this.path = v }
                set template(v) { this.template = v }
                set name(v) { this.name = v }

                bind() {
                    this.map.forEach((v, k, m) => {
                        console.log(this.template)
                        this.template = this.template.replaceAll(k, v);

                    });
                }
                addConfig(v) {
                    this.map = new Map(Object.entries(v.props.json), this.map);
                }

            }
          