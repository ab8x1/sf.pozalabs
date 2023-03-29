export default function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n > 0 ? n < 10 ? '0' + n : n : ''; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  return `${d}${d>0 ? 'd' : ''} ${pad(h)}${h>0 ? 'h' : ''} ${pad(m)}${m>0 ? 'm' : ''}`;
}