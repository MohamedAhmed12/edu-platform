@servers(['web-1' => 'tqniat@51.210.215.180 -p 8452', 'web-2' => 'tqniat@51.210.215.67 -p 8452', 'web-3' => 'tqniat@51.210.215.66 -p 8452'])

@task('purge_cache', ['on' => ['web-1']])
    sh /var/www/html/production/purge_cache.sh
@endtask

@story('deploy', ['on' => ['web-2', 'web-1', 'web-3']])
    clone_repository
    deploy
    rsync
    clean
    purge_cache
@endstory

@setup
    $repository = 'git@bitbucket.org:kiteagency/student.git';
    $releases_dir = '/var/www/html/production/student/releases';
    $app_dir = '/var/www/html/production/student';
    $release = date('YmdHis');
    $new_release_dir = $releases_dir .'/'. $release;
	  $branch = isset($branch) ? $branch : "production";
@endsetup

@task('rsync')
    echo 'Sync servers'
    sh {{ $app_dir}}/rsync.sh {{ $new_release_dir }}

    cd {{ $new_release_dir }}

    echo 'Linking current release'
    ln -nfs {{ $new_release_dir }} {{ $app_dir }}/current

    pm2 delete ecosystem.config.js
    pm2 start
@endtask

@task('clone_repository')
    echo 'Cloning repository'
    [ -d {{ $releases_dir }} ] || mkdir {{ $releases_dir }}
    git clone --depth 1 -b {{ $branch }} {{ $repository }} {{ $new_release_dir }}
    cd {{ $new_release_dir }}
    git reset --hard {{ $commit }}
@endtask

@task('deploy')
    echo "Starting deployment ({{ $release }}) from branch {{ $branch }}"

    cd {{ $new_release_dir }}

    sh {{ $app_dir}}/deploy.sh {{ $new_release_dir }} {{ $app_dir }}
@endtask

@task('clean')
    echo "CLEAN!!"
    find {{$releases_dir}} -mindepth 1 -maxdepth 1 -type d -not -name {{$release}} \
    -exec rm -rf '{}' \;
@endtask

