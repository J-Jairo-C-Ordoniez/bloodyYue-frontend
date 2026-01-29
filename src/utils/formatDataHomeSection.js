export default function formatDataHomeSection(post, commission) {
    const filterData = (data, type) => {
        const rta = (data || []).map(p => {
            return {
                ...p,
                feedType: type,
                importance: Math.random() * 10
            }
        })
        
        return rta
    }

    const posts = filterData(post, 'post');
    const commissions = filterData(commission, 'commission');

    return [...posts, ...commissions].sort((a, b) => b.importance - a.importance);
}