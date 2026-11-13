import dimensions from '../mediaDimensions.json'

export default function PortfolioImage({ src, loading = 'lazy', ...props }) {
  const [width, height] = dimensions[src.split('/').pop()] || []
  return <img src={src} width={width} height={height} loading={loading} {...props} />
}
