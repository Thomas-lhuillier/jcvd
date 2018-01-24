module.exports = {
  apps : [{
    name : "jcvd",
    script : "./jcvd.js",
    watch : true,
    out_file : "./logs/out.log",
    error_file : "./logs/err.log",
    restart_delay : 4000,
    ignore_watch: ['./logs/*', 'node_modules'],
  }]
}
