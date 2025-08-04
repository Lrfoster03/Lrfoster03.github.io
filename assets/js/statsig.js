// Helper functions to get browser info
function getBrowserInfo() {
    const ua = navigator.userAgent;
    return {
        browser_name: getBrowserName(ua),
        browser_version: getBrowserVersion(ua),
        os: getOS(ua),
        os_version: getOSVersion(ua),
        device_model: navigator.platform,
        country: Intl.DateTimeFormat().resolvedOptions().locale,
        language: navigator.language,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}

function getBrowserName(ua) {
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
}

function getBrowserVersion(ua) {
    const match = ua.match(/(Firefox|Chrome|Safari|Edge)\/(\d+\.\d+)/);
    return match ? match[2] : 'Unknown';
}

function getOS(ua) {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac OS')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('iPhone')) return 'iOS';
    if (ua.includes('Android')) return 'Android';
    return 'Unknown';
}

function getOSVersion(ua) {
const match = ua.match(/(?:Windows NT|Mac OS X|Android) ([0-9._]+)/);
return match ? match[1] : 'Unknown';
}

async function initializeStatsig(page_title) {
    let ip = '';
    try {
        console.log('Initializing Statsig');

        await statsig.initialize(
            'client-yt8ZTsabx4SergArwGrJwLMpXYxaWG2nHstUosOBjVa',
            { userID: 'WebsiteUser' },
            {
                environment: { tier: window.JEKYLL_ENV }
            }
        );
        
        console.log('Analytics enabled');

        // Get IP address
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        ip = data.ip;

        // Get browser and system info
        const userAgent = navigator.userAgent;
        const browserInfo = {
            browser_name: getBrowserName(userAgent),
            browser_version: getBrowserVersion(userAgent),
            os: getOS(userAgent),
            os_version: getOSVersion(userAgent),
            device_model: navigator.platform,
            country: Intl.DateTimeFormat().resolvedOptions().locale,
            language: navigator.language,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        statsig.logEvent('Project Site Access', null, { 
            ...browserInfo,
            ip_address: ip,
            page: page_title
        });
        
        console.log('Successfully logged user access event');
        
    } catch (error) {
        console.log('Failed to log analytics event:', error.message);
    }
}