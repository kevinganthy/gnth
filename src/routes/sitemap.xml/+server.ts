export const prerender = true;

export async function GET() {
	const getDate = new Date();
	const date = getDate.toISOString().split('T')[0];

	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://gnth.fr/</loc>
                <lastmod>${date}</lastmod>
            </url>
        </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
