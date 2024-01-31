class InfinityBeyond{


    constructor(){
        this.scene  = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000)
        this.renderer = new THREE.WebGLRenderer()
        this.starGeo  = new THREE.Geometry()
    }




    init(){
        this.camera.position.z = 1
        this.camera.position.y = Math.PI/2

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        for(let i=0; i<6000; i++){
            let star = new THREE.Vector3(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300)
            star.velocity = 0
            star.acceleration = 0.002
            this.starGeo.vertices.push(star)
        }

        let sprite = new THREE.TextureLoader().load('https://quetzalcg.github.io/InfinityBeyond/Images/star.png')
        let starMaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 0.7, map: sprite})

        this.stars = new THREE.Points(this.starGeo, starMaterial)
        this.scene.add(this.stars)

        window.addEventListener('resize', this.onWindowResize.bind(this), false)

        this.animate()
    }




    onWindowResize(){
        this.camera.aspect = window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }




    animate(){
        this.starGeo.vertices.forEach(p => {
            p.velocity += p.acceleration
            p.y -= p.velocity

            if(p.y < -200){
                p.y = 200
                p.velocity = 0
            }
        })

        this.starGeo.verticesNeedUpdate = true
        this.stars.rotation.y += 0.002

        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.animate.bind(this))
    }
}

let infinityBeyond = new InfinityBeyond()
infinityBeyond.init()