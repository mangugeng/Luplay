import { db } from '../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

async function seedData() {
    try {
        // Add series data
        const seriesRef = doc(db, 'series', 'series1');
        await setDoc(seriesRef, {
            title: 'Merajut Dendam',
            synopsis: 'Sebuah kisah tentang dendam dan penebusan',
            genre: { value: 'drama', label: 'Drama' },
            age_rating: { value: '13+', label: '13+' },
            status: 'live',
            image_banner_desktop: 'https://example.com/banner.jpg',
            create_at: new Date()
        });

        // Add episodes
        const episodes = [
            {
                id_doc: 'episode1',
                title: 'Episode 1: Awal Mula',
                synopsis: 'Perjalanan dimulai dari sini...',
                image: 'https://example.com/ep1.jpg',
                video_url: 'https://example.com/ep1.mp4',
                badge: 'GRATIS',
                create_at: new Date()
            },
            {
                id_doc: 'episode2',
                title: 'Episode 2: Pertemuan',
                synopsis: 'Takdir mempertemukan mereka...',
                image: 'https://example.com/ep2.jpg',
                video_url: 'https://example.com/ep2.mp4',
                badge: 'GRATIS',
                create_at: new Date()
            }
        ];

        for (const episode of episodes) {
            const episodeRef = doc(db, 'series', 'series1', 'episode', episode.id_doc);
            await setDoc(episodeRef, episode);
        }

        // Add trailers
        const trailers = [
            {
                id_doc: 'trailer1',
                title_trailer: 'Official Trailer',
                synopsis_trailer: 'Saksikan serial terbaru...',
                image_trailer: 'https://example.com/trailer.jpg',
                video_url: 'https://example.com/trailer.mp4',
                video_id: 'series1',
                status: 'live',
                create_at: new Date()
            }
        ];

        for (const trailer of trailers) {
            const trailerRef = doc(db, 'trailers', trailer.id_doc);
            await setDoc(trailerRef, trailer);
        }

        console.log('Data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

seedData(); 