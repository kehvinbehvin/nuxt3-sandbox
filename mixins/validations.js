import _every from 'lodash/every';
import _some from 'lodash/some';
import _get from 'lodash/get';

export default {
    name:'validate',
    methods: {
        collectInvalidKeys(v) {
            if (!v) {
                return [v];
            }

            const invalidKeys = [];
            const keys = Object.keys(v).filter(a => a[0] !== '$');
            keys.forEach(key => {
                if (v[key] === false) {
                    invalidKeys.push(key);
                }

                if (v[key].$invalid) {
                    const invalidChildKeys = this.collectInvalidKeys(v[key]);
                    if (invalidChildKeys.length) {
                        invalidKeys.push(invalidChildKeys.map(a => `${key}.${a}`));
                    }
                }
            })
            return invalidKeys;
        },
        isValid() {
            this.v$.$touch();
            let isMyselfValid = !this.v$.$invalid;
            let validChildren = [];

            if (!isMyselfValid) {
                console.log('Invalid keys:', this.collectInvalidKeys(this.v$));
            }

            // Check if we have references
            if (this.$refs) {
                // console.log("[isValid]" , this.$refs)

                // Get an array of references
                const refs = Object.keys(this.$refs);
                console.log("Validations.js", refs)
                refs.forEach((ref) => {
                    //console.log("[isValid]", this.$refs[ref])

                    // Prepare for calling child validation
                    if (Array.isArray(this.$refs[ref])) {
                        // Call isValid on every child
                        let myChildren = this.$refs[ref].map((child) => {
                            return this.isChildValid(child)
                        });
                        validChildren = [...validChildren, ...myChildren];
                    } else {
                        // Call isValid on the only child
                        const isChildValid = this.isChildValid(this.$refs[ref])
                        validChildren = [...validChildren, isChildValid];
                    }
                })
            }
            console.log('validChildren',validChildren)

            // If child doesn't have isValid function, it would return undefined
            // So filter only Boolean values.
            const filteredChildren = validChildren.flat().filter((child) => {
                return child === true || child === false;
            });
            // console.log("[isValid]" ,filteredChildren)
            const areAllChildrenValid = _every(filteredChildren, (child) => child === true );
            console.log("[isValid] isMyselfValid:", isMyselfValid, "areAllChildrenValid:", areAllChildrenValid)
            const isValid = isMyselfValid && areAllChildrenValid;
            if (!isValid) {
                console.log('Validation failed: ', this.v$);
            }

            return isValid;
        },
        isChildValid(child) {
            // This will return undefined unless child has isValid function
            if (child) {
                if (typeof child.isValid === 'function' ) {
                    return child.isValid()
                } else {
                    console.info(`[isChildValid] Child ${child.$options && child.$options._componentTag} does not have isValid function`, child);
                }
            } else {
                console.error('Invalid child parameter')
            }
        },
        isDirty() {
            let isMyselfDirty = this.v$.$anyDirty;
            let dirtyChildren = [];

            // Check if we have references
            if (this.$refs) {
                // console.log("[isDirty]" , this.$refs)

                // Get an array of references
                const refs = Object.keys(this.$refs);
                // console.log("[isDirty] refs" , refs)
                refs.forEach((ref) => {
                    //console.log("[isDirty]", this.$refs[ref])

                    // Prepare for calling child validation
                    if (Array.isArray(this.$refs[ref])) {
                        // Call isValid on every child
                        let myChildren = this.$refs[ref].map((child) => {
                            return this.isChildDirty(child)
                        });
                        dirtyChildren = [...dirtyChildren, ...myChildren];
                    } else {
                        // Call isValid on the only child
                        const isChildDirty = this.isChildDirty(this.$refs[ref])
                        dirtyChildren = [...dirtyChildren, isChildDirty];
                    }
                })
            }
            // console.log(`[isDirty] ${this.$options._componentTag} dirtyChildren` ,dirtyChildren);

            // If child doesn't have isValid function, it would return undefined
            // So filter only Boolean values.
            const filteredChildren = dirtyChildren.flat().filter((child) => {
                return child === true || child === false;
            });

            console.log(`[isDirty] ${this.$options._componentTag}` ,filteredChildren);
            const areSomeChildrenDirty = _some(filteredChildren, (child) => child === true );

            // console.log(`[isDirty] ${this.$options._componentTag}` ,isMyselfDirty, '||', areSomeChildrenDirty)

            return isMyselfDirty || areSomeChildrenDirty
        },
        isChildDirty(child) {
            // This will return undefined unless child has isValid function
            if (child) {
                if (typeof child.isDirty === 'function' ) {
                    return child.isDirty()
                } else {
                    console.info(`[isChildDirty] Child ${child.$options && child.$options._componentTag} does not have isDirty function`, child);
                }
            } else {
                console.error('Invalid child parameter');
            }
        },
        // Helper method to reset validations after saving.
        resetDirty() {
            this.v$.$reset();
            // Check if we have references
            if (this.$refs) {
                // console.log("[resetDirty]" , this.$refs)

                // Get an array of references
                const refs = Object.keys(this.$refs);
                refs.forEach((ref) => {
                    // console.log("[resetDirty]", this.$refs[ref])

                    // Prepare for calling child validation
                    if (Array.isArray(this.$refs[ref])) {
                        // Call reset on every child
                        this.$refs[ref].map((child) => {
                            this.resetChild(child)
                        })
                    } else {
                        // Call reset on the only child
                        this.resetChild(this.$refs[ref])
                    }
                })
            }
        },
        resetChild(child) {
            if (child) {
                if (typeof child.resetDirty === 'function' ) {
                    return child.resetDirty()
                } else {
                    console.info(`[resetChild] Child ${child.$options && child.$options._componentTag} does not have resetDirty function`, child);
                }
            }
        },



        // Helper method to find proper structure in validation model and mark field dirty
        touchField(vm, fieldName) {
            // Strip any index array notation as validator does not keep track of index
            const indexFreeFieldName = fieldName.replace(/(\[\d+\])/, '');
            // NOTE: Might want to only check end of string to match this?
            const isEditing = /(?:\[)(isEditing)(?:\])/.test(fieldName) || fieldName === 'isEditing';

            if (isEditing) {
                // No need to touch on toggle editing
                return;
            }

            let validationRoot = '';
            if (vm.v$.entity) {
                validationRoot = 'entity';
            }
            else if (vm.v$.investmentRound) {
                validationRoot = 'investmentRound';
            }
            else if (vm.v$.programme) {
                validationRoot = 'programme';
            }
            else if (vm.v$.fund) {
                validationRoot = 'fund';
            }
            else if (vm.v$.investor) {
                validationRoot = 'investor';
            }
            else if (vm.v$.address) {
                validationRoot = 'address';
            }
            else if (vm.v$.video) {
                validationRoot = 'video';
            }
            else if (vm.v$.otherWebsite) {
                validationRoot = 'otherWebsite';
            }
            else if (vm.v$.techCollaboration) {
                validationRoot = 'techCollaboration';
            }
            // TODO: add more checks based on fieldnames used in child components

            // Allow structure to flexible and not only rely on presence of hardcoded entity property.
            if (_get(vm.v$, `${validationRoot}.${indexFreeFieldName}`)) {
                _get(vm.v$, `${validationRoot}.${indexFreeFieldName}`).$touch();
                console.log(`Managed to touch ${validationRoot}.${indexFreeFieldName}`)
            }
            else {
                // Take note this error might be shown when being called through updateChildEntity. In that case it might give a false warning since parent doesn't need to be touched inside the $each block.
                // To prevent this warning from being shown, you could add the property inside the $each block.
                // However this would create redundant code.
                console.warn(`[entityForm] Could not touch ${indexFreeFieldName} validation.`, `Path tried: ${validationRoot}.${indexFreeFieldName}`, vm.v$);
                // Nothing worked, so don't return anything
                return;
            }

            // Return the path which worked, not necessary
            return `${validationRoot}.${indexFreeFieldName}`;
        },
        /**
         * Refs index is not guaranteed to be the same as data index, this is a helper method as a workaround
         * @param {Array} refs - the ref or list of refs
         * @param {Integer} index - the index of the ref in the refs
         * @param {String} indexAttr - the template attribute used to pass the real index
         * @param {Object} component - the vue component ref
         */
        getCorrectRef({refs, index, indexAttr = 'data-index', ...component}) {
            if (!(index || index === 0 || index === '0')) {
                // console.info('[getCorrectRef] simple usage detected', component);
                return component;
            }

            if (!Array.isArray(refs)) {
                console.error('[getCorrectRef] Expected refs to be an array!', refs);
                return component;
            }

            if (!Number.isInteger(index)) {
                console.error('[getCorrectRef] Passed index is not an integer:', index);
                index = parseInt(index, 10);
                console.warn('[getCorrectRef] Tried to parse to integer:', index);
            }

            // NOTE: refs index is not guaranteed to be the same as data index!
            // Find the correct ref -> requires passing data-index attribute
            const foundRef = refs.find((ref) => {
                return ref.$attrs && ref.$attrs[indexAttr] == index;
            });

            return foundRef || refs[index];
        },
        /**
         * To update store and mark updated field as dirty, used when update happens through bubbled event
         * @param {Array} refs - the ref or list of refs
         * @param {Integer} index - the index of the ref in the refs
         * @param {String} indexAttr - the template attribute used to pass the real index
         * @param {Object} component - the vue component ref
         * @param {String} childFieldName - full v$ path to child value
         * @param {String} fieldName - path to value in store
         * @param value
         */
        updateChildEntity({refs, index, indexAttr, ...component}, childFieldName, fieldName, value) {
            const correctRef = this.getCorrectRef({refs, index, indexAttr, ...component});

            //  Touch child
            this.touchField(correctRef, childFieldName);

            //  Actually update
            this.updateEntity(fieldName, value);
        },
        // To update store and mark updated field as dirty
        updateEntity(fieldName, value) {
            // Mark updated field as dirty
            this.touchField(this, fieldName);

            this.$store.dispatch('profile/updateEntity', {fieldName, value});
        },
    }
}
