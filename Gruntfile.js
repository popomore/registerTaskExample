module.exports = function(grunt) {

  grunt.initConfig({
    multi: {
      files: 'this.data'
    },

    simple: {
      src: ['a.js']
    },

    filesObj: {
      simple: ['files/a.js'],

      'compact-format': {
        src: ['files/a.js'],
        dest: 'b.js'
      },

      'files-object-format': {
        files: {
          'x.js': ['files/a.js', 'files/b.js'],
          'y.js': ['files/a.js', 'files/c.js'],
          'z.js': ['files/b.js', 'files/c.js']
        }
      },

      'files-array-format': {
        files: [
          {src: ['files/a.js', 'files/b.js'], dest: 'x.js'},
          {src: ['files/a.js', 'files/c.js'], dest: 'y.js'},
          {src: ['files/b.js', 'files/c.js'], dest: 'z.js'}
        ]
      },

      dynamic1: {
        files: [
          {
            expand: true,
            cwd: 'files',
            src: '*.js',
            dest: 'dist'
          }
        ]
      },

      dynamic2: {
        files: [
          {
            expand: true,
            cwd: 'files',
            src: '*.js',
            dest: 'dist',
            ext: '.min.js'
          }
        ]
      }
    }
  });

  grunt.registerTask('simple', function(arg) {
    // $ grunt simple
    // => name: simple
    grunt.log.writeln('name: ' + this.name);

    // $ grunt simple:a:b
    // => nameArgs: simple:a:b
    grunt.log.writeln('nameArgs: ' + this.nameArgs);

    // $ grunt simple:a
    // => arguments: a
    grunt.log.writeln('arguments: ' + arg);

    // $ grunt simple:a:b
    // => args: [ 'a', 'b' ]
    // => flags: { a: true, b: true }
    // multiTask 会忽略 target 本身
    grunt.log.writeln('args: ' + JSON.stringify(this.args));
    grunt.log.writeln('flags: ' + JSON.stringify(this.flags));
  });

  grunt.registerMultiTask('multi', function(arg) {
    // $ grunt multi
    // => name: multi
    grunt.log.writeln('name: ' + this.name);

    // $ grunt multi:files
    // => nameArgs: multi:files
    grunt.log.writeln('nameArgs: ' + this.nameArgs);

    // $ grunt multi:files:a
    // => arguments: a
    // multiTask 会忽略 target 本身
    grunt.log.writeln('arguments: ' + arg);

    // $ grunt multi:files:a:b
    // => args: [ 'a', 'b' ]
    // => flags: { a: true, b: true }
    // multiTask 会忽略 target 本身
    grunt.log.writeln('args: ' + JSON.stringify(this.args));
    grunt.log.writeln('flags: ' + JSON.stringify(this.flags));

    // 以下只存在与 multiTask

    // $ grunt multi:files
    // => data: this.data
    grunt.log.writeln('data: ' + this.data);

    // $ grunt multi:files
    // => target: files
    // 输入其他会报错，找不到 target
    grunt.log.writeln('target: ' + this.target);
  });

  grunt.registerMultiTask('filesObj', function() {
    grunt.log.writeln('>> this.files: ');
    grunt.log.writeln(JSON.stringify(this.files, null, 2));
    grunt.log.writeln('>> this.filesSrc: ');
    grunt.log.writeln(JSON.stringify(this.filesSrc, null, 2));
    grunt.log.writeln('=======================');
  });

};
