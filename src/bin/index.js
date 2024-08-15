#!/usr/bin/env node
const fs = require('node:fs');
const yargs = require('yargs')
const { compile } = require('./compile.js');
const process = require('process')
const path = require('path')


function init() {
  console.log(`[INFO]  index: cleaning build folder!`)
  fs.rmSync(process.cwd() + path.sep + 'build', { recursive: true, force: true });

  console.log(`[INFO]  index: creating a new build folder!`)
  fs.mkdirSync(process.cwd() + path.sep + 'build');

  console.log(`[INFO]  index: reading 'project.json'!`)
  let project = fs.readFileSync(process.cwd() + path.sep + 'project.json')
  project = JSON.parse(project)
  project.namespace = process.cwd()
  fs.writeFileSync(process.cwd() + path.sep + 'project.json', JSON.stringify(project))

}

yargs.command({
  command: 'cp',
  describe: 'Akumos Project Compile command',
  builder: {
    n: {
      describe: 'Namespace name',
      demandOption: false,
      type: 'string'

    }

  },
  handler(argv) {
    try {
      init()
      compile(false)

      console.log(`[INFO]  index: compile command fineshed!`)

    } catch (error) {
      throw new Error(`[ERROR] index: error trying compile: \n ${error}`)

    }

  }
}).command({
  command: 'init',
  describe: 'Init a new Akumos Project',
  handler(argv) {
    try {
      if (!fs.existsSync('src')) {
        fs.mkdirSync('src');
      }
      if (!fs.existsSync('config')) {
        fs.mkdirSync('config');
      }
      if (!fs.existsSync('tmpl')) {
        fs.mkdirSync('tmpl');
      }
      if (!fs.existsSync('app')) {
        fs.mkdirSync('app');
      }
      if (!fs.existsSync('build')) {
        fs.mkdirSync('build');
      }
      if (!fs.existsSync('libs')) {
        fs.mkdirSync('libs');

      }
      if (!fs.existsSync('project.json')) {
        fs.writeFileSync(process.cwd() + path.sep + '/project.json', `{"namespace":"${process.cwd()}"}`)

      }
      if (!fs.existsSync('main.js')) {
        fs.writeFileSync(process.cwd() + path.sep + '/main.js', `(function(app){\n  console.log('running akumos project...')  \n})(app)`)

      }
    } catch (err) {
      console.log(`[ERROR] index: error trying init an Akumos project: ${err}`);

    }
  }
}).command({
  command: 'test',
  describe: 'Akumos Project Test command',
  handler(argv) {
    init()
    compile(true)
  }

})

yargs.parse()