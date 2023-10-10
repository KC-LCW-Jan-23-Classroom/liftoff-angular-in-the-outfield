import { Component } from '@angular/core';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  movieList: Movie[] = [
    new Movie(
      1,
      'Peter Pan',
      ['Adventure', 'Family', 'Fantasy', 'Romance'],
      'PG',
      2003,
      113,
      '/assets/images/posters/peter-pan.png',
      'In stifling Edwardian London, Wendy Darling mesmerizes her brothers every night with bedtime tales of swordplay, swashbuckling, and the fearsome Captain Hook. But the children become the heroes of an even greater story, when Peter Pan flies into their nursery one night and leads them over moonlit rooftops through a galaxy of stars and to the lush jungles of Neverland. Wendy and her brothers join Peter and the Lost Boys in an exhilarating life--free of grown-up rules--while also facing the inevitable showdown with Hook and his bloodthirsty pirates.',
      'P.J. Hogan',
      ['Jeremy Sumpter', 'Jason Isaacs', 'Olivia Williams'],
      ['Prime']
    ),

    new Movie(
      2,
      'Barbie',
      ['Adventure', 'Fantasy', 'Comedy'],
      'PG-13',
      2023,
      114,
      '/assets/images/posters/barbie.png',
      'Barbie suffers a crisis that leads her to question her world and her existence.',
      'Greta Gerwig',
      ['Margot Robbie', 'Ryan Gosling'],
      ['Netflix', 'Hulu', 'Apple TV']
    ),

    new Movie(
      3,
      'The Sandlot',
      ['Comedy', 'Drama', 'Family'],
      'PG',
      1993,
      101,
      '/assets/images/posters/sandlot.png',
      'Scotty Smalls moves to a new neighborhood with his mom and stepfather and wants to learn to play baseball. Benny Rodriguez, the neighborhood baseball guru, takes him under his wing and he soon becomes part of the local baseball buddies. They fall into adventures involving baseball, treehouse sleepovers, the desirous lifeguard at the local pool, the snooty rival Little League team, and the travelling fair. Beyond the fence at the back of the sandlot menaces a legendary ball-eating dog called the Beast, and the kids inevitably must deal with him.',
      'David Mickey Evans',
      ['Tom Guiry', 'Mike Vitar', 'Art LaFleur'],
      ['Prime']
    ),

    new Movie(
      4,
      'Inception',
      ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
      'PG-13',
      2010,
      148,
      '/assets/images/posters/inception.png',
      "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible, inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea, but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.",
      'Christopher Nolan',
      ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      ['Prime']
    ),
  ];
}
