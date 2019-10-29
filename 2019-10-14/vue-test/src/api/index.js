import request from '@/utils/request'
import resource from './resource'

export default function(name, params) {
    let paths = name.split('.')
    let apiArgs = resource
    paths.forEach(item => {
        if (typeof apiArgs === 'undefined') {
            return
        }
        apiArgs = apiArgs[item]
    })
    if (typeof apiArgs === 'object' && apiArgs.method && apiArgs.url) {
        let arg = {
            method: apiArgs.method,
            url: apiArgs.url,
            params
        }
        return request(arg)
    }
    return undefined
}