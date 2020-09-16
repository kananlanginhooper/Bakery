import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import {Bread} from '../classes/Bread'

export default function BreadList() {
  const arrBreads = [];
  arrBreads.push(new Bread('Sourdough', 'https://images.heb.com/is/image/HEBGrocery/000410164', 'https://www.nuggetmarket.com/media/images/14/16/sourdough-bread.jpg'))
  arrBreads.push(new Bread('Whole Grain', 'https://thumbs.dreamstime.com/b/sliced-square-whole-grain-flour-bread-located-white-background-close-up-175647458.jpg', 'https://previews.123rf.com/images/alpaksoy/alpaksoy1805/alpaksoy180500639/101503710-freshly-baked-whole-wheat-grain-kaiser-roll-round-breads-with-sack-traditional-bakery.jpg'))
  arrBreads.push(new Bread('Banana Bread', 'https://www.handletheheat.com/wp-content/uploads/2012/04/banana-bread-SQUARE-500x500.jpg', 'https://1.bp.blogspot.com/_Q5SpTKazer0/R10jYI-FwaI/AAAAAAAABtA/mNfPuXqxXSU/s400/banana+cake1.jpg'))
  arrBreads.push(new Bread('Ciabatta', 'https://open.imagebank.lantmannen.com/Lantmannen%20Unibake/pimimage/3971.jpg', 'https://i.pinimg.com/originals/49/24/c8/4924c8b210e8104e0ef1cc0da78b755f.jpg'))
  arrBreads.push(new Bread('Rye Bread', 'https://images.squarespace-cdn.com/content/v1/57893a9de6f2e1db88e5d44c/1473711465331-7AVMG1FJSFQL6X1E4W1T/ke17ZwdGBToddI8pDm48kNGb_2GvqEoOytUU6-0XDQBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwCEYAKlGgOCjzB_p3lll2KZvrLikqF5Vl9O7xgnrzgQemnAlcTYBP6J3EkVhrJuBA/image-asset.jpeg', 'https://i.ytimg.com/vi/p5VcDzC_z5U/hqdefault.jpg'))
  arrBreads.push(new Bread('Brioche', 'https://img-global.cpcdn.com/recipes/5131801143017472/751x532cq70/standard-square-pullman-loaf-recipe-main-photo.jpg', 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Brioche.jpg'))
  return arrBreads;
}


